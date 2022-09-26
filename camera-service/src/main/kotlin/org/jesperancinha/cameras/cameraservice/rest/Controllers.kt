package org.jesperancinha.cameras.cameraservice.rest

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jesperancinha.cameras.cameraservice.service.CameraService
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController

@RestController
class CameraController(
    val cameraService: CameraService,
    @Value("\${hc.camera.number}")
    val cameraNumber: Long
) {

    @GetMapping
    fun welcome() = "Welcome to Healthy cameras!"

    @GetMapping(value = ["/camera"], produces = [MediaType.IMAGE_JPEG_VALUE])
    @ResponseBody
    suspend fun getImageProtected(): ByteArray? = withContext(Dispatchers.IO) {
        cameraService.getImageByteArrayByCameraNumber(cameraNumber)
    }

}