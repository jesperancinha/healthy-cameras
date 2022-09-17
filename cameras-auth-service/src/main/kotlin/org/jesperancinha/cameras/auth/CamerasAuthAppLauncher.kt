package org.jesperancinha.cameras.auth

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
class CamerasAuthAppLauncher

fun main(args: Array<String>) {
    SpringApplication.run(CamerasAuthAppLauncher::class.java, *args)
}