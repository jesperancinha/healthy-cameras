package org.jesperancinha.cameras.cameraservice.config

import io.micrometer.core.instrument.Counter
import io.micrometer.core.instrument.Gauge
import io.micrometer.core.instrument.MeterRegistry
import kotlinx.coroutines.runBlocking
import org.jesperancinha.cameras.cameraservice.service.CameraService
import org.jesperancinha.cameras.cameraservice.service.SecurityService.Companion.logger
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import kotlin.system.measureNanoTime


/**
 * Created by jofisaes on 02/07/2022
 * Configuration of all metric beans for prometheus.
 * If Spring statsD is activated, then all metric info will be sent to StatsD along
 * Running this service withing the preconfigured containers will mean that graphite will have 2 sources of information:
 * 1. The actual back end camera services
 * 2. Kong StatsD Plugin
 */
    @Configuration
    class MetricsConfiguration(
        val cameraService: CameraService,
        @Value("\${hc.camera.number}")
        val cameraNumber: Long
    ) {
        private val last10FileDeltaNSReading: MutableList<Double> = mutableListOf()

        /**
         * You should see all fails happening every 10 seconds if your sampling rate in graphite is configured for 10 seconds
         * For every 10 seconds you'll get all fails in that period
         */
        @Bean
        @Qualifier("counterMetric")
        fun counterMetric(meterRegistry: MeterRegistry) = Counter.builder("camera.fail.count")
            .tag("type", "fail_count")
            .description("The number of anomalies detected by the camera")
            .register(meterRegistry)

        /**
         * You should see all fails happening every 10 seconds if your sampling rate in graphite is configured for 10 seconds
         * For every 10 seconds you'll get all fails in that period
         */
        @Bean
        @Qualifier("heartBeats")
        fun heartBeatCounter(meterRegistry: MeterRegistry) = Counter.builder("camera.heartbeats")
            .tag("type", "heart_beats")
            .description("The number of heartbeats measured per time and counts 1 per second")
            .baseUnit("beats")
            .register(meterRegistry)

        /**
         * Measures the time it takes to read an image.
         * This is purely to illustrate how can we inject our own custom metrics in StatsD.
         */
        @Bean
        fun gaugeMetric(meterRegistry: MeterRegistry) =
            Gauge.builder("camera.image.read.time", last10FileDeltaNSReading)
            { last10Records ->
                logger.debug("$last10FileDeltaNSReading")
                measureNanoTime { runBlocking { cameraService.getImageByteArrayByCameraNumber(cameraNumber) } }.toDouble()
                    .let { record ->
                        last10Records.add(record)
                        if (last10Records.size == 11) {
                            last10Records.removeFirst()
                        }
                        logger.info("Refreshed ${last10Records.size} metrics. Last value read is ${last10Records.last()} ns")
                        record
                    }
            }
                .tag("type", "image_read_ns")
                .description("Time to read one image from camera in ns")
                .baseUnit("ns")
                .register(meterRegistry)

    }