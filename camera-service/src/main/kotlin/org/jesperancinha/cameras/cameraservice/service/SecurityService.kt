package org.jesperancinha.cameras.cameraservice.service

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class SecurityService {
    fun checkHeader(scope: String) = logger.info("Accessing with scope {}", scope).let { scope == "admin" }

    companion object {
        val logger: Logger = LoggerFactory.getLogger(SecurityService::class.java)
    }
}