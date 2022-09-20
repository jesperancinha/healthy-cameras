package org.jesperancinha.cameras.auth

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.event.ContextRefreshedEvent
import org.springframework.context.event.EventListener
import org.springframework.core.env.*
import org.springframework.stereotype.Component
import java.util.*
import java.util.stream.StreamSupport


@SpringBootApplication
class CamerasAuthAppLauncher(
    @Value("\${server.port}")
    val port: Long
) : ApplicationRunner {

    companion object {
        val logger = LoggerFactory.getLogger(CamerasAuthAppLauncher::class.java)
    }

    override fun run(args: ApplicationArguments?) {
        logger.info("Go to -> http://localhost:$port/api/v1/cameras/auth/ when running locally")
        logger.info("Go to -> https://localhost:8443/camera-6-service/api/v1/hc for the secured OAuth2 application")
    }
}

fun main(args: Array<String>) {
    SpringApplication.run(CamerasAuthAppLauncher::class.java, *args)
}


@Component
class ApplicationPropertyLogger {
    @EventListener
    fun handleContextRefresh(event: ContextRefreshedEvent) {
        val env = event.applicationContext.environment
        logger.info("═══════════════════════════════════════════════════════════════════════════════════════")
        val sources = (env as AbstractEnvironment).propertySources
        StreamSupport.stream(sources.spliterator(), false)
            .filter { ps: PropertySource<*>? -> ps is EnumerablePropertySource<*> }
            .map { ps: PropertySource<*> -> (ps as EnumerablePropertySource<*>).propertyNames }
            .flatMap(Arrays::stream)
            .distinct()
            .filter { it.startsWith("hc") || it.startsWith("spring") || it.startsWith("server") }
            .forEach { prop: String ->
                logger.info("{}: {}", prop, env.getProperty(prop))
            }
        logger.info("═══════════════════════════════════════════════════════════════════════════════════════")
    }

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(ApplicationPropertyLogger::class.java)
    }
}