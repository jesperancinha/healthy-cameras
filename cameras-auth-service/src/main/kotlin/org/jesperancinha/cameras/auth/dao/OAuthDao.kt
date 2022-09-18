package org.jesperancinha.cameras.auth.dao

class AuthorizeBody(
    val clientId: String,
    val scope: String,
    val provisionKey: String,
    val authenticatedUserId: String,
    val responseType: String
)

class ResAuthorizeBody(
    val redirectUri: String
)

class TokenRequest(
    clientId: String,
    clientSecret: String,
    authenticatedUserid: String,
    scope: String,
    grantType: String,
    code: String
)