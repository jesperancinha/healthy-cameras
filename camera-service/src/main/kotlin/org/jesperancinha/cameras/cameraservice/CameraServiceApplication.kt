package org.jesperancinha.cameras.cameraservice

import io.micrometer.core.instrument.Counter
import io.swagger.v3.oas.annotations.OpenAPIDefinition
import io.swagger.v3.oas.annotations.info.Info
import io.swagger.v3.oas.annotations.servers.Server
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity
import org.springframework.web.reactive.HandlerMapping
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping
import org.springframework.web.reactive.socket.WebSocketHandler


@SpringBootApplication(exclude = [SecurityAutoConfiguration::class])
@EnableScheduling
@EnableWebFluxSecurity
@OpenAPIDefinition(
    info = Info(title = "OpenAPI definition"),
    servers = [Server(url = "\${hc.server.url}/api/v1/hc", description = "Server URL")]
)
@EnableReactiveMethodSecurity
class CameraServiceApplication(
    private val webSocketHandler: WebSocketHandler,
    @Qualifier("heartBeats")
    private val heartBeats: Counter
) {

    /**
     * You should see 10 heartbeats as a max in graphite if graphite is configure to take samples every 10 seconds.
     * For every 10 seconds you'll get 10 heart beats
     */
    @Scheduled(cron = "*/1 * * * * *")
    fun incrementHeartBeat() {
        heartBeats.increment()
    }

    @Bean
    fun webSocketHandlerMapping(): HandlerMapping? {
        val map: MutableMap<String, WebSocketHandler> = HashMap()
        map["/camera-states-emitter"] = webSocketHandler
        val handlerMapping = SimpleUrlHandlerMapping()
        handlerMapping.order = 1
        handlerMapping.urlMap = map
        return handlerMapping
    }

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            runApplication<CameraServiceApplication>(*args)
        }
    }
}


