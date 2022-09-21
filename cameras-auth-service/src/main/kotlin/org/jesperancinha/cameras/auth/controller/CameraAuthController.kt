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
        @RequestParam(value = "response_type", required = false) responseType: String?,
        @RequestParam(value = "client_id", required = false) clientId: String?,
        @RequestParam(value = "scope", required = false) scope: String?,
        @RequestParam(value = "state", required = false) state: String?,
        @RequestParam(value = "redirect_uri", required = false) redirectUrl: String?,
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

