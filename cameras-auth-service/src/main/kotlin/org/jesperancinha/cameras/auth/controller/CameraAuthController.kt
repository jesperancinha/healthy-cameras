package org.jesperancinha.cameras.auth.controller

import org.jesperancinha.cameras.auth.service.TokenService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import java.security.Principal

@RestController
class CameraAuthController(
    val tokenService: TokenService
) {

    @GetMapping
    suspend fun createToken(principal: Principal) = tokenService.createToken(principal)
}