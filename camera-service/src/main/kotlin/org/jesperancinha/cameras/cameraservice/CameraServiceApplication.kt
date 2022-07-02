package org.jesperancinha.cameras.cameraservice

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
	fun calculateDiff(){
		println("Minute!")
	}
}

fun main(args: Array<String>) {
	runApplication<CameraServiceApplication>(*args)
}
