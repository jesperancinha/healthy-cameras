package org.jesperancinha.cameras.auth.controller

import org.jesperancinha.cameras.auth.dao.ClientTokenRequest
import org.jesperancinha.cameras.auth.service.TokenService
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController


@RestController
class CameraAuthController(
    val tokenService: TokenService
) {

    @GetMapping
    fun createToken(
        usernamePasswordAuthenticationToken: UsernamePasswordAuthenticationToken,
        @RequestParam(value = "response_type", required = true) responseType: String,
        @RequestParam(value = "client_id", required = true) clientId: String,
        @RequestParam(value = "scope", required = true) scope: String,
        @RequestParam(value = "state", required = true) state: String,
        @RequestParam(value = "redirect_uri", required = true) redirectUrl: String,
    ) = ClientTokenRequest(
        responseType = responseType,
        clientId = clientId,
        scope = scope,
        state = state,
        redirectUri = redirectUrl
    ).let { ctr ->
        tokenService.validate(ctr)
        tokenService.createToken(usernamePasswordAuthenticationToken, ctr)
    }

}

