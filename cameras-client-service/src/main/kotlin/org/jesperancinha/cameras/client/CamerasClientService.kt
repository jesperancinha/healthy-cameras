package org.jesperancinha.cameras.client

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
class CamerasClientService (
    @Value("\${server.port}")
    val port: Long
) : ApplicationRunner {

    override fun run(args: ApplicationArguments?) {
        logger.info("Go to -> http://localhost:$port/api/v1/cameras/client to try to access any endpoint when running locally")
        logger.info("Go to -> http://localhost:8086/api/v1/cameras/auth/ to go directly to the login page")
        logger.info("Go to -> https://localhost:8443/camera-6-service/api/v1/hc for the secured OAuth2 application")
    }

    companion object {
        val logger: Logger = LoggerFactory.getLogger(CamerasClientService::class.java)
    }
}

fun main(args: Array<String>) {
    SpringApplication.run(CamerasClientService::class.java, *args)
}