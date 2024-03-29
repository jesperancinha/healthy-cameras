package org.jesperancinha.cameras.client.configuration;

import org.springframework.http.HttpHeaders.CONTENT_TYPE
import org.springframework.http.MediaType.APPLICATION_JSON_VALUE
import org.springframework.security.oauth2.client.endpoint.OAuth2ClientCredentialsGrantRequest
import org.springframework.security.oauth2.client.endpoint.ReactiveOAuth2AccessTokenResponseClient
import org.springframework.security.oauth2.core.OAuth2AccessToken.TokenType.BEARER
import org.springframework.security.oauth2.core.endpoint.OAuth2AccessTokenResponse
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.reactive.function.client.bodyToMono
import reactor.core.publisher.Mono

data class CustomTokenRequest(val clientId: String?, val clientSecret: String?)

data class NotStandardTokenResponse(val accessToken: String, val refreshToken: String)

@Component
class CustomTokenResponseClient : ReactiveOAuth2AccessTokenResponseClient<OAuth2ClientCredentialsGrantRequest> {

    private val webClient = WebClient.builder().build()

    override fun getTokenResponse(
        authorizationGrantRequest: OAuth2ClientCredentialsGrantRequest
    ): Mono<OAuth2AccessTokenResponse> =
        webClient.post()
            .uri(authorizationGrantRequest.clientRegistration.providerDetails.tokenUri)
            .header(CONTENT_TYPE, APPLICATION_JSON_VALUE)
            .bodyValue(
                CustomTokenRequest(
                    clientId = authorizationGrantRequest.clientRegistration.clientId,
                    clientSecret = authorizationGrantRequest.clientRegistration.clientSecret
                )
            )
            .exchange()
            .flatMap { it.bodyToMono<NotStandardTokenResponse>() }
            .map { it.toOAuth2AccessTokenResponse() }


    private fun NotStandardTokenResponse.toOAuth2AccessTokenResponse() = OAuth2AccessTokenResponse
        .withToken(this.accessToken)
        .refreshToken(this.refreshToken)
        .tokenType(BEARER)
        .build()

}