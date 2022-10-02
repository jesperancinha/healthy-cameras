package org.jesperancinha.cameras.cameraservice.rest

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jesperancinha.cameras.cameraservice.service.CameraService
import org.jesperancinha.cameras.cameraservice.service.SecurityService
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Mono
import reactor.kotlin.core.publisher.toMono

@RestController
class CameraController(
    val cameraService: CameraService,
    @Value("\${hc.camera.number}")
    val cameraNumber: Long,
    val securityService: SecurityService
) {

    @GetMapping
    fun welcome() = "Welcome to Healthy cameras!"

    @GetMapping(value = ["/camera"], produces = [MediaType.IMAGE_JPEG_VALUE])
    @ResponseBody
    suspend fun getImageProtected(): ByteArray? = withContext(Dispatchers.IO) {
        cameraService.getImageByteArrayByCameraNumber(cameraNumber)
    }

    @GetMapping(value = ["/userid"])
    @ResponseBody
    suspend fun findUserId(@RequestHeader("x-authenticated-userid") userId: String?) = ResponseEntity.ok(userId)

    @GetMapping(value = ["/consumerid"])
    @ResponseBody
    suspend fun findConsumerId(@RequestHeader("x-consumer-username") consumerId: String?) =
        ResponseEntity.ok(consumerId)

    @GetMapping(value = ["/credentialid"])
    @ResponseBody
    suspend fun findCredentialId(@RequestHeader("x-credential-identifier") credentialId: String?) =
        ResponseEntity.ok(credentialId)

    @GetMapping(value = ["/headers"])
    @ResponseBody
    suspend fun findAllHeaders(@RequestHeader headers: Map<String, String>?) = ResponseEntity.ok(headers)

    @GetMapping(value = ["/whatever"])
    @ResponseBody
    @PreAuthorize("@securityService.checkHeader(#scope)")
    fun test(@RequestHeader("x-authenticated-scope") scope: String) = ResponseEntity.ok(scope).toMono()
}