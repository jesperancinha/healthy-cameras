package org.jesperancinha.cameras.cameraservice

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class CameraServiceApplication

fun main(args: Array<String>) {
	runApplication<CameraServiceApplication>(*args)
}
