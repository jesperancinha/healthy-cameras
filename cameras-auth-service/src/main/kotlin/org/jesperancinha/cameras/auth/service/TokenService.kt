package org.jesperancinha.cameras.auth.service

import org.jesperancinha.cameras.auth.dao.AuthorizeBody
import org.jesperancinha.cameras.auth.dao.ResAuthorizeBody
import org.jesperancinha.cameras.auth.dao.TokenRequest
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient
import reactor.core.publisher.Mono

@Service
class TokenService(
    @Value("\${hc.auth.oauth.client_id}")
    val clientId: String,
    @Value("\${hc.auth.oauth.client_secret}")
    val clientSecret: String,
    @Value("\${hc.auth.oauth.provision_key}")
    val provisionKey: String,
    @Value("\${hc.auth.oauth.authenticated_user_id}")
    val authenticatedUserid: String,
    @Value("\${hc.auth.oauth.response_type}")
    val responseType: String,
    @Value("\${hc.auth.oauth.grant_type}")
    val grantType: String
) {

    val webFluxClient: WebClient = WebClient.create()

    fun createToken(principal: UsernamePasswordAuthenticationToken): Mono<String> {
        val scope = principal.authorities.map { it.authority }[0]
        return webFluxClient.post()
            .bodyValue(
                AuthorizeBody(
                    clientId = clientId,
                    scope = scope,
                    provisionKey = provisionKey,
                    authenticatedUserId = authenticatedUserid,
                    responseType = responseType
                )
            ).retrieve()
            .bodyToMono(ResAuthorizeBody::class.java)
            .map {
                webFluxClient.post()
                    .bodyValue(
                        TokenRequest(
                            clientId = clientId,
                            clientSecret = clientSecret,
                            authenticatedUserid = authenticatedUserid,
                            scope = scope,
                            grantType = grantType,
                            code = ""
                        )
                    ).retrieve()
                    .bodyToMono(String::class.java)
            }.flatMap { it }
    }
}