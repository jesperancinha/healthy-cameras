package org.jesperancinha.cameras.cameraservice.service

import io.kotest.matchers.nulls.shouldBeNull
import io.kotest.matchers.nulls.shouldNotBeNull
import io.kotest.matchers.shouldBe
import kotlinx.coroutines.runBlocking
import org.junit.jupiter.api.Test

class CameraServiceTest {

    private val cameraService by lazy {
        object : CameraService(bank = "cameras") {
            override fun findCurrentMinute(): Int = 1
        }
    }


    private val cameraService1 by lazy {
        object : CameraService(bank = "cameras") {
            override fun findCurrentMinute(): Int = 6
        }
    }

    @Test
    fun `should get image 0 from from cameras`(): Unit = runBlocking {
        cameraService.shouldMatchExpectedCameras()
    }

    @Test
    fun `should get image 1 from from cameras`(): Unit = runBlocking {
        cameraService1.shouldMatchExpectedCameras()
    }

    @Test
    fun `should get service camera bank directory`() {
        cameraService.bank shouldBe "cameras"
        cameraService1.bank shouldBe "cameras"
    }
}

private suspend fun CameraService.shouldMatchExpectedCameras() {
    getImageByteArrayByCameraNumber(0).shouldBeNull()
    (1..6).forEach {
        getImageByteArrayByCameraNumber(it.toLong()).shouldNotBeNull()
    }
    getImageByteArrayByCameraNumber(7).shouldBeNull()
}
