package org.jesperancinha.cameras.cameraservice.service

import io.micrometer.core.instrument.Counter
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.stereotype.Service

@Service
class SecurityService(
    @Qualifier("counterMetric") val counterMetric: Counter
) {

    fun checkAdminHeader(scope: String) = checkHeader(scope, "admin")

    fun checkObserverHeader(scope: String) = checkHeader(scope, "observer")

    fun checkVisitorHeader(scope: String) = checkHeader(scope, "visitor")

    fun checkResearcherHeader(scope: String) = checkHeader(scope, "researcher")

    private fun checkHeader(scope: String, expectedScope: String) =
        logger.info("Accessing with scope {}", scope).let {
            when (scope == expectedScope) {
                true -> true
                else -> counterMetric.increment().let { false}
            }
        }

    companion object {
        val logger: Logger = LoggerFactory.getLogger(SecurityService::class.java)
    }
}
