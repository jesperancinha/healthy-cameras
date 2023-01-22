package org.jesperancinha.cameras.auth.service

import io.kotest.matchers.shouldBe
import org.jesperancinha.cameras.auth.dao.BearerToken
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.*
import kotlin.math.exp


@SpringBootTest(properties = ["hc.auth.oauth.provision_key=tra-la-la"])
class TokenServiceTest @Autowired constructor(
    val tokenService: TokenService
){

    @Test
    fun `should enrich bearer token`(){
        BearerToken(
            refreshToken = UUID.randomUUID().toString(),
            accessToken =  UUID.randomUUID().toString(),
            expiresIn = LocalDateTime.now().toString(),
            tokenType = "signed books with a story"
        ).let { bt->
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
}