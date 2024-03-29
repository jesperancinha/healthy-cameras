package org.jesperancinha.cameras.auth.service

import org.jesperancinha.cameras.auth.dao.*
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpHeaders.CONTENT_TYPE
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED_VALUE
import org.springframework.http.MediaType.APPLICATION_JSON
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.BodyInserters
import org.springframework.web.reactive.function.client.WebClient
import reactor.core.publisher.Mono
import java.net.URI


@Service
class TokenService(
    @Value("\${hc.auth.oauth.client_id}") val clientId: String,
    @Value("\${hc.auth.oauth.client_secret}") val clientSecret: String,
    @Value("\${hc.auth.oauth.provision_key}") val provisionKey: String,
    @Value("\${hc.auth.oauth.authenticated_userid}") val authenticatedUserid: String,
    @Value("\${hc.auth.oauth.response_type}") val responseType: String,
    @Value("\${hc.auth.oauth.grant_type}") val grantType: String,
    @Value("\${hc.auth.oauth.url.auth}") val authUrl: String,
    @Value("\${hc.auth.oauth.url.token}") val tokenUrl: String,
    @Value("\${hc.auth.guest.validate}") val validate: Boolean,
    @Autowired val webFluxClient: WebClient
) {

    fun createToken(
        principal: UsernamePasswordAuthenticationToken, ctr: ClientTokenRequest
    ): Mono<ResponseEntity<BearerTokenEnriched>> = principal.authorities.map { it.authority }[0].let { scope ->
        webFluxClient.post().uri(authUrl).header(CONTENT_TYPE, APPLICATION_FORM_URLENCODED_VALUE)
            .accept(APPLICATION_JSON).body(createAuthFormRequestBody(scope))
            .retrieve().bodyToMono(ResAuthorizeBody::class.java).map { authorizeBody ->
                logger.info("Response redirect uri: ${authorizeBody.redirectUri}")
                logger.info("Input redirect uri: ${ctr.redirectUri}")
                if (validate) {
                    authorizeBody.validate(ctr)
                }
                webFluxClient.post().uri(tokenUrl).body(
                    createTokenFormRequestBody(scope, authorizeBody)
                ).retrieve().bodyToMono(BearerToken::class.java).map { bearerToken ->
                    bearerToken.enrich(authorizeBody.redirectUri)
                }
            }
            .flatMap { it }
            .map {
                ResponseEntity
                    .status(HttpStatus.OK)
                    .header("Authorization", "bearer ${it.accessToken}")
                    .location(URI.create(it.redirectUri))
                    .body(it)
            }
    }

    private fun createTokenFormRequestBody(
        scope: String,
        authorizeBody: ResAuthorizeBody
    ) = BodyInserters.fromFormData(
        TokenRequest(
            clientId = clientId,
            clientSecret = clientSecret,
            authenticatedUserid = authenticatedUserid,
            scope = scope,
            grantType = grantType,
            code = authorizeBody.redirectUri.split("=")[1]
        ).toMultiValueMap()
    )

    private fun createAuthFormRequestBody(scope: String) = BodyInserters.fromFormData(
        AuthorizeBody(
            clientId = clientId,
            scope = scope,
            provisionKey = provisionKey,
            authenticatedUserId = authenticatedUserid,
            responseType = responseType
        ).toMultiValueMap()
    )

    fun validate(clientTokenRequest: ClientTokenRequest) {
        if (validate) {
            logger.info("clientId = ${clientTokenRequest.clientId}")
            logger.info("scope = ${clientTokenRequest.scope}")
            logger.info("responseType = ${clientTokenRequest.responseType}")
            if (clientId != clientTokenRequest.clientId || clientTokenRequest.scope != "admin" || responseType != clientTokenRequest.responseType) fail()
        }
    }

    companion object {
        val logger: Logger = LoggerFactory.getLogger(TokenService::class.java)
    }
}

internal fun BearerToken.enrich(redirectUri: String) = BearerTokenEnriched(
    refreshToken = refreshToken,
    accessToken = accessToken,
    expiresIn = expiresIn,
    tokenType = tokenType,
    redirectUri = redirectUri
)

internal fun ResAuthorizeBody.validate(ctr: ClientTokenRequest) {
    ctr.redirectUri?.let { if (!redirectUri.startsWith(ctr.redirectUri)) fail() } ?: fail()
}

private fun fail() {
    throw RuntimeException("OAuth2 Validation Failed!")
}

