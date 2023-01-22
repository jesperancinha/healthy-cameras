package org.jesperancinha.cameras.auth.service

import io.kotest.assertions.throwables.shouldNotThrow
import io.kotest.assertions.throwables.shouldThrow
import io.kotest.matchers.shouldBe
import org.jesperancinha.cameras.auth.dao.BearerToken
import org.jesperancinha.cameras.auth.dao.ClientTokenRequest
import org.jesperancinha.cameras.auth.dao.ResAuthorizeBody
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import java.time.LocalDateTime
import java.util.*

/**
 * Sneller Brass is a fictional character of my novel spread around different repos and articles across the web
 */
@SpringBootTest(properties = ["hc.auth.oauth.provision_key=tra-la-la"])
class TokenServiceTest @Autowired constructor(
    val tokenService: TokenService,
) {

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
}