package org.jesperancinha.cameras.cameraservice.rest

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jesperancinha.cameras.cameraservice.service.CameraService
import org.jesperancinha.cameras.cameraservice.service.SecurityService
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController
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

    @GetMapping(value = ["/scopes/admin"])
    @ResponseBody
    @PreAuthorize("@securityService.checkAdminHeader(#scope)")
    fun findScopeAdminInfo(@RequestHeader("x-authenticated-scope") scope: String) = findScopeAdminInfo()

    @GetMapping(value = ["/scopes/observer"])
    @ResponseBody
    @PreAuthorize("@securityService.checkObserverHeader(#scope)")
    fun findScopeObserverInfo(@RequestHeader("x-authenticated-scope") scope: String) = findScopeObserverInfo()

    @GetMapping(value = ["/scopes/visitor"])
    @ResponseBody
    @PreAuthorize("@securityService.checkVisitorHeader(#scope)")
    fun findScopeVisitorInfo(@RequestHeader("x-authenticated-scope") scope: String) = findScopeVisitorInfo()

    @GetMapping(value = ["/scopes/researcher"])
    @ResponseBody
    @PreAuthorize("@securityService.checkResearcherHeader(#scope)")
    fun findScopeResearcherInfo(@RequestHeader("x-authenticated-scope") scope: String) = findScopeResearcherInfo()

}

private fun findScopeAdminInfo() = findScopeInfo("admin")

private fun findScopeObserverInfo() = findScopeInfo("observer")

private fun findScopeVisitorInfo() = findScopeInfo("visitor")

private fun findScopeResearcherInfo() = findScopeInfo("researcher")

private fun findScopeInfo(scope: String) =
    ResponseEntity.ok("This is the info for users with scope $scope.").toMono()
