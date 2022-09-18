package org.jesperancinha.cameras.auth.service

import org.jesperancinha.cameras.auth.dao.AuthorizeBody
import org.jesperancinha.cameras.auth.dao.ResAuthorizeBody
import org.jesperancinha.cameras.auth.dao.TokenRequest
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient
import reactor.core.publisher.Mono
import java.security.Principal

@Service
class TokenService {

    val webFluxClient: WebClient = WebClient.create()

    fun createToken(principal: Principal): Mono<String> {
        return webFluxClient.post()
            .bodyValue(
                AuthorizeBody(
                    clientId = "",
                    scope = "",
                    provisionKey = "",
                    authenticatedUserId = "",
                    responseType = ""
                )
            ).retrieve()
            .bodyToMono(ResAuthorizeBody::class.java)
            .map {
                webFluxClient.post()
                    .bodyValue(
                        TokenRequest(
                            clientId = "",
                            clientSecret = "",
                            authenticatedUserid = "",
                            scope = "",
                            grantType = "",
                            code = ""
                        )
                    ).retrieve()
                    .bodyToMono(String::class.java)
            }.flatMap { it }
    }
}