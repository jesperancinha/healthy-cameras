package org.jesperancinha.cameras.auth.service

import com.ninjasquad.springmockk.MockkBean
import io.kotest.assertions.throwables.shouldNotThrow
import io.kotest.assertions.throwables.shouldThrow
import io.kotest.matchers.collections.shouldHaveSize
import io.kotest.matchers.nulls.shouldNotBeNull
import io.kotest.matchers.shouldBe
import io.mockk.every
import org.jesperancinha.cameras.auth.dao.BearerToken
import org.jesperancinha.cameras.auth.dao.ClientTokenRequest
import org.jesperancinha.cameras.auth.dao.ResAuthorizeBody
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.GrantedAuthority
import org.springframework.web.reactive.function.client.WebClient
import reactor.core.publisher.Mono
import java.time.LocalDateTime
import java.util.*

/**
 * Sneller Brass is a fictional character of my novel spread around different repos and articles across the web
 */
@SpringBootTest(
    properties = [
        "hc.auth.oauth.provision_key=tra-la-la",
        "hc.auth.guest.validate=true"]
)
class TokenServiceTest @Autowired constructor(
    val tokenService: TokenService,
) {

    @MockkBean(relaxed = true)
    lateinit var webFluxClient: WebClient

    @Test
    fun `should enrich bearer token`() {
        BearerToken(
            refreshToken = UUID.randomUUID().toString(),
            accessToken = UUID.randomUUID().toString(),
            expiresIn = LocalDateTime.now().toString(),
            tokenType = "signed books with a story"
        ).let { bt ->
            bt.enrich("http://localhost:8080")
                .apply {
                    refreshToken shouldBe bt.refreshToken
                    accessToken shouldBe bt.accessToken
                    expiresIn shouldBe bt.expiresIn
                    tokenType shouldBe bt.tokenType
                    redirectUri shouldBe "http://localhost:8080"
                }
        }
    }

    @Test
    fun `should validate negatively when URL is unexpected`() {
        shouldThrow<RuntimeException> {
            ResAuthorizeBody(
                redirectUri = "http://localhost:8080"
            ).validate(
                ClientTokenRequest(
                    clientId = UUID.randomUUID().toString(),
                    responseType = "Heel EVEN!",
                    scope = "Annotaties!!!!!!",
                    state = "I wasn't able to lift it",
                    redirectUri = "http://localhost:9000"
                )
            )
        }.message shouldBe "OAuth2 Validation Failed!"
    }

    @Test
    fun `should validate positively when URL is expected`() {
        shouldNotThrow<RuntimeException> {
            ResAuthorizeBody(
                redirectUri = "http://localhost:8080"
            ).validate(
                ClientTokenRequest(
                    clientId = UUID.randomUUID().toString(),
                    responseType = "A great response",
                    scope = "Annotations work great with Spring",
                    state = "You could have lifted it up, Mr. Sneller Brass, but I guess you didn't like \"Annotaties!!!!!!\"",
                    redirectUri = "http://localhost:8080"
                )
            )
        }
    }

    @Test
    fun `should validate positively when token request is valid`() {
        shouldNotThrow<RuntimeException> {
            tokenService.validate(
                ClientTokenRequest(
                    clientId = "CAMERA06CLIENTID",
                    responseType = "code",
                    scope = "admin",
                    state = "OK",
                    redirectUri = "http://localhost:8080"
                )
            )
        }
    }

    @Test
    fun `should not validate positively when token request is invalid`() {
        listOf(
            "CAMERA06CLIENTIDX" to "code" to "admin",
            "CAMERA06CLIENTID" to "codeX" to "admin",
            "CAMERA06CLIENTID" to "code" to "adminX",
        ).forEach { (first, scope) ->
            val (clientId, responseType) = first
            shouldThrow<RuntimeException> {
                tokenService.validate(
                    ClientTokenRequest(
                        clientId = clientId,
                        responseType = responseType,
                        scope = scope,
                        state = "OK",
                        redirectUri = "http://localhost:8080"
                    )
                )
            }.message shouldBe "OAuth2 Validation Failed!"
        }
    }

    @Test
    fun `should validate that the web client exists and functions`() {
        tokenService
            .shouldNotBeNull()
            .webFluxClient.shouldNotBeNull()
    }

    @Test
    fun `should get the correct token`() {
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

        tokenService.createToken(
            UsernamePasswordAuthenticationToken(
                "user", "user",
                listOf(GrantedAuthority { "admin" })
            ),
            ClientTokenRequest(
                clientId = "CAMERA06CLIENTID",
                responseType = "code",
                scope = "admin",
                state = "OK",
                redirectUri = "http://localhost:8080"
            )
        )
            .shouldNotBeNull()
            .block()
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