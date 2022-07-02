package org.jesperancinha.cameras.cameraservice.rest

import io.micrometer.core.aop.TimedAspect
import io.micrometer.core.instrument.Counter
import io.micrometer.core.instrument.Gauge
import io.micrometer.core.instrument.MeterRegistry
import org.springframework.context.annotation.Bean
import org.springframework.stereotype.Service


/**
 * Created by jofisaes on 02/07/2022
 */
@Service
class MetricsService {

    private val diffsList: MutableList<Long> = mutableListOf()

    @Bean
    fun counterMetric(meterRegistry: MeterRegistry) = Counter.builder("camera.anomaly")
        .tag("type", "anomaly")
        .description("The number of anomalies detected by the camera")
        .register(meterRegistry)

    @Bean
    fun gaugeMetric(meterRegistry: MeterRegistry) = Gauge.builder("camera.diff.realtime", diffsList) { it.size.toDouble() }
        .description("Number of unserved orders")
        .register(meterRegistry)

    @Bean
    fun timedAspect(meterRegistry: MeterRegistry): TimedAspect {
        return TimedAspect(meterRegistry)
    }

}