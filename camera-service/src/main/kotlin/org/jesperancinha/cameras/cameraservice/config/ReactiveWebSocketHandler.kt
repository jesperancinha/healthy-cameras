package org.jesperancinha.cameras.cameraservice.config

import com.fasterxml.jackson.core.JsonProcessingException
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.boot.actuate.health.*
import org.springframework.stereotype.Component
import org.springframework.web.reactive.socket.WebSocketHandler
import org.springframework.web.reactive.socket.WebSocketMessage
import org.springframework.web.reactive.socket.WebSocketSession
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import reactor.core.publisher.SynchronousSink
import java.time.Duration
import java.time.LocalDateTime.now
import java.util.UUID.randomUUID


data class Event(
    val id: String, val dateTime: String, val status: Status
)

@Component
class ReactiveWebSocketHandler(
    val healthIndicator: PingHealthIndicator
) : WebSocketHandler {
    override fun handle(webSocketSession: WebSocketSession): Mono<Void> =
        webSocketSession.send(fluxIteration.map { payload: String? -> webSocketSession.textMessage(payload ?: "") })
            .and(webSocketSession.receive().map { obj: WebSocketMessage -> obj.payloadAsText }.log())

    private val eventFlux = Flux.generate { sink: SynchronousSink<String?> ->
        Event(
            id = randomUUID().toString(),
            dateTime = now().toString(),
            status = healthIndicator.health().status
        ).let { event ->
            try {
                sink.next(objectMapper.writeValueAsString(event))
            } catch (e: JsonProcessingException) {
                sink.error(e)
            }
        }
    }
    private val fluxIteration = Flux.interval(Duration.ofMillis(1000L)).zipWith(
        eventFlux
    ) { _: Long, event: String? -> event }
}

private val objectMapper: ObjectMapper = ObjectMapper()
