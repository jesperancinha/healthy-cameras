package org.jesperancinha.cameras.cameraservice.rest

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class CameraController {

    @GetMapping
    fun welcome() = "Welcome to Healthy cameras!"

}