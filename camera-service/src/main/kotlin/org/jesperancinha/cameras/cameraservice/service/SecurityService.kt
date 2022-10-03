package org.jesperancinha.cameras.cameraservice.service

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class SecurityService {

    fun checkAdminHeader(scope: String) = checkHeader(scope, "admin")

    fun checkObserverHeader(scope: String) = checkHeader(scope, "observer")

    fun checkVisitorHeader(scope: String) = checkHeader(scope, "visitor")

    fun checkResearcherHeader(scope: String) = checkHeader(scope, "researcher")

    private fun checkHeader(scope: String, expectedScope: String) =
        logger.info("Accessing with scope {}", scope).let { scope == expectedScope }

    companion object {
        val logger: Logger = LoggerFactory.getLogger(SecurityService::class.java)
    }
}
