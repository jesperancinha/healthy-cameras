package org.jesperancinha.cameras.auth.controller

import org.jesperancinha.cameras.auth.service.TokenService
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class CameraAuthController(
    val tokenService: TokenService
) {

    @GetMapping
    fun createToken(usernamePasswordAuthenticationToken: UsernamePasswordAuthenticationToken) =
        tokenService.createToken(usernamePasswordAuthenticationToken)
}