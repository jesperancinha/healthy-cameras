package org.jesperancinha.cameras.client

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
class CamerasClientService

fun main(args: Array<String>) {
    SpringApplication.run(CamerasClientService::class.java, *args)
}