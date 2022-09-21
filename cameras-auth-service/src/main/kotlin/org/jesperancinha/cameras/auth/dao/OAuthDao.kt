package org.jesperancinha.cameras.auth.dao

import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.databind.PropertyNamingStrategies
import com.fasterxml.jackson.databind.annotation.JsonNaming
import org.springframework.util.LinkedMultiValueMap
import org.springframework.util.MultiValueMap

class AuthorizeBody(
    val clientId: String,
    val scope: String,
    val provisionKey: String,
    val authenticatedUserId: String,
    val responseType: String
)

fun AuthorizeBody.toMultiValueMap(): MultiValueMap<String, String> = LinkedMultiValueMap<String, String>().apply {
    add("client_id", clientId)
    add("scope", scope)
    add("provision_key", provisionKey)
    add("authenticated_userid", authenticatedUserId)
    add("response_type", responseType)
}

data class ResAuthorizeBody(
    @JsonProperty("redirect_uri")
    val redirectUri: String
)

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy::class)
data class BearerToken(
    @JsonProperty("refresh_token")
    val refreshToken: String,
    @JsonProperty("access_token")
    val accessToken: String,
    @JsonProperty("expires_in")
    val expiresIn: String,
    @JsonProperty("token_type")
    val tokenType: String
)

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy::class)
data class BearerTokenEnriched(
    @JsonProperty("refresh_token")
    val refreshToken: String,
    @JsonProperty("access_token")
    val accessToken: String,
    @JsonProperty("expires_in")
    val expiresIn: String,
    @JsonProperty("token_type")
    val tokenType: String,
    @JsonProperty("redirect_uri")
    val redirectUri: String
)

class TokenRequest(
    val clientId: String,
    val clientSecret: String,
    val authenticatedUserid: String,
    val scope: String,
    val grantType: String,
    val code: String
)

fun TokenRequest.toMultiValueMap() = LinkedMultiValueMap<String, String>().apply {
    add("client_id", clientId)
    add("client_secret", clientSecret)
    add("authenticated_userid", authenticatedUserid)
    add("scope", scope)
    add("grant_type", grantType)
    add("code", code)
}

data class ClientTokenRequest(
    val clientId: String,
    val responseType: String,
    val scope: String,
    val state: String,
    val redirectUri: String,
)
