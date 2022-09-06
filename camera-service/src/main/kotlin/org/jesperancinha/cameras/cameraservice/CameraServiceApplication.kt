package org.jesperancinha.cameras.cameraservice

import io.micrometer.core.annotation.Timed
import io.swagger.v3.oas.annotations.OpenAPIDefinition
import io.swagger.v3.oas.annotations.info.Info
import io.swagger.v3.oas.annotations.servers.Server
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.scheduling.annotation.Scheduled
import java.util.concurrent.atomic.AtomicInteger

@SpringBootApplication
@EnableScheduling
@OpenAPIDefinition(
    info = Info(title = "OpenAPI definition"),
    servers = [Server(url = "\${hc.server.url}/api/v1/hc", description = "Server URL")]
)
class CameraServiceApplication {

	val atomicInt:AtomicInteger = AtomicInteger()

	@Scheduled(cron = "*/1 * * * * *")
	@Timed(description = "Time spent calculating difference", extraTags =["camera.diff.time"])
	fun calculateDiff(){
		println("Minute!")
	}

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            runApplication<CameraServiceApplication>(*args)
        }
    }
}


