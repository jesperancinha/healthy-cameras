package org.jesperancinha.cameras.cameraservice.service

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.nio.file.Files
import java.nio.file.Path
import java.time.LocalDateTime
import kotlin.io.path.name
import kotlin.io.path.readBytes
import kotlin.math.absoluteValue

@Service
class CameraService(
    @Value("\${hc.camera.bank}")
    val bank: String
) {
    suspend fun getImageByteArrayByCameraNumber(number: Long) =
        Path.of(System.getProperty("user.dir"), "${bank}/camera$number")
            .let { resource ->
                val allImages =
                    Files.walk(resource).use { paths ->
                        val filter = paths
                            .sorted()
                            .filter { it.name.endsWith("jpg") }
                        filter.toList()
                    }
                if (allImages.size > 0) {
                    val countImages = allImages?.size ?: 0
                    val delta = (10 / countImages.toDouble())
                    val currentMinute = LocalDateTime.now().second.toString().last().digitToInt()
                    val index = (((currentMinute + 1) / delta).toInt()).absoluteValue - 1
                    allImages?.get(if (index == -1) 0 else index)?.let { resource.resolve(it.name) }
                } else return null
            }?.readBytes()
}