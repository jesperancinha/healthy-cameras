package org.jesperancinha.cameras.auth.controller

import com.ninjasquad.springmockk.MockkBean
import io.kotest.matchers.collections.shouldHaveSize
import io.kotest.matchers.nulls.shouldNotBeNull
import io.kotest.matchers.shouldBe
import io.mockk.every
import org.jesperancinha.cameras.auth.dao.BearerToken
import org.jesperancinha.cameras.auth.dao.BearerTokenEnriched
import org.jesperancinha.cameras.auth.dao.ResAuthorizeBody
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.web.reactive.function.client.WebClient
import reactor.core.publisher.Mono
import java.util.*

@SpringBootTest(
    webEnvironment = RANDOM_PORT, properties = [
        "hc.auth.oauth.provision_key=tra-la-la",
        "hc.auth.guest.validate=true",
        "hc.csrf.enable=true"]
)
class CameraAuthControllerTest @Autowired constructor(
    val testRestTemplate: TestRestTemplate
) {

    @MockkBean(relaxed = true)
    lateinit var webFluxClient: WebClient

    @Test
    @WithMockUser("guest")
    fun `should create token by calling service`() {
        val testCode = UUID.randomUUID()
        every {
            webFluxClient.post().uri(any<String>()).header(
                HttpHeaders.CONTENT_TYPE,
                MediaType.APPLICATION_FORM_URLENCODED_VALUE
            )
                .accept(MediaType.APPLICATION_JSON).body(any())
                .retrieve()
                .bodyToMono(ResAuthorizeBody::class.java)
        } returns Mono.just(
            ResAuthorizeBody(
                "http://localhost:8080?code=$testCode"
            )
        )
        val bearerToken = BearerToken(
            refreshToken = UUID.randomUUID().toString(),
            accessToken = UUID.randomUUID().toString(),
            expiresIn = UUID.randomUUID().toString(),
            tokenType = UUID.randomUUID().toString(),
        )
        every {
            webFluxClient.post().uri(any<String>()).body(
                any()
            ).retrieve().bodyToMono(BearerToken::class.java)
        } returns Mono.just(
            bearerToken
        )
        val url = "/api/v1/cameras/auth/?response_type=code&client_id=CAMERA06CLIENTID&scope=admin&state=Ok&redirect_uri=http://localhost:8080"
        testRestTemplate.getForEntity(url, BearerTokenEnriched::class.java)
            .shouldNotBeNull()
            .let {
                it.headers
                    .apply {
                        get("Authorization")
                            .shouldNotBeNull()
                            .shouldHaveSize(1)
                            .first()
                            .shouldBe("bearer ${bearerToken.accessToken}")
                        get("Location")
                            .shouldNotBeNull()
                            .shouldHaveSize(1)
                            .first()
                            .shouldBe("http://localhost:8080?code=$testCode")
                    }
                it.body
                    .shouldNotBeNull()
                    .apply {
                        refreshToken shouldBe bearerToken.refreshToken
                        accessToken shouldBe bearerToken.accessToken
                        expiresIn shouldBe bearerToken.expiresIn
                        tokenType shouldBe bearerToken.tokenType
                        redirectUri shouldBe "http://localhost:8080?code=$testCode"
                    }
            }
    }
}