package org.jesperancinha.cameras.cameraservice

import io.micrometer.core.annotation.Timed
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.scheduling.annotation.Scheduled
import java.util.concurrent.atomic.AtomicInteger

@SpringBootApplication
@EnableScheduling
class CameraServiceApplication {

	val atomicInt:AtomicInteger = AtomicInteger()

	@Scheduled(cron = "*/1 * * * * *")
	@Timed(description = "Time spent calculating difference", extraTags =["camera.diff.time"])
	fun calculateDiff(){
		println("Minute!")
	}
}

fun main(args: Array<String>) {
	runApplication<CameraServiceApplication>(*args)
}
