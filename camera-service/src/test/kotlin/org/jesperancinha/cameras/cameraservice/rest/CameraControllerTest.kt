package org.jesperancinha.cameras.cameraservice.rest

import com.fasterxml.jackson.databind.JsonNode
import io.kotest.matchers.nulls.shouldBeNull
import io.kotest.matchers.shouldBe
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod.GET


/**
 * Madame Pat is a fictional character that I use in my novel that is spread around different repos and projects.
 */
@SpringBootTest(webEnvironment = RANDOM_PORT)
class CameraControllerTest @Autowired constructor(
    val restTemplate: TestRestTemplate,
) {

    @Test
    fun `should find welcome message`() {
        restTemplate.getForEntity("/api/v1/hc", String::class.java)
            .body shouldBe "Welcome to Healthy cameras!"
    }

    @Test
    fun `should read the user header correctly`() {
        val headers = HttpHeaders()
        headers["x-authenticated-userid"] = "Madame Pat"
        val entity: HttpEntity<String> = HttpEntity("body", headers)
        restTemplate.exchange("/api/v1/hc/userid", GET, entity, String::class.java)
            .body shouldBe "Madame Pat"
    }

    @Test
    fun `should read the consumer header correctly`() {
        val headers = HttpHeaders()
        headers["x-consumer-username"] = "Someone who wrote the excel correctly"
        val entity: HttpEntity<String> = HttpEntity("body", headers)
        restTemplate.exchange(
            "/api/v1/hc/consumerid",
            GET,
            entity,
            String::class.java)
            .body shouldBe "Someone who wrote the excel correctly"
    }

    @Test
    fun `should read the credential correctly`() {
        val headers = HttpHeaders()
        headers["x-credential-identifier"] = "The stellige secret of Madame Pat"
        val entity: HttpEntity<String> = HttpEntity("body", headers)
        restTemplate.exchange(
            "/api/v1/hc/credentialid",
            GET,
            entity,
            String::class.java)
            .body shouldBe "The stellige secret of Madame Pat"
    }
    @Test
    fun `should read the headers`() {
        val headers = HttpHeaders()
        headers["cleaner"] = "doing his best but always under Madame Pat's dominant control"
        val entity: HttpEntity<String> = HttpEntity("body", headers)
        restTemplate.exchange(
            "/api/v1/hc/headers",
            GET,
            entity,
            JsonNode::class.java)
            .body?.findValue("cleaner")
            .toString()
            .trim { it =='\"' } shouldBe "doing his best but always under Madame Pat's dominant control"
    }
    @Test
    fun `should not read the admin scope`() {
        val headers = HttpHeaders()
        headers["x-authenticated-scope"] = "Cheese food for brain"
        val entity: HttpEntity<String> = HttpEntity("body", headers)
        restTemplate.exchange(
            "/api/v1/hc/scopes/admin",
            GET,
            entity,
            String::class.java)
            .body.shouldBeNull()
    }
    @Test
    fun `should read the admin scope`() {
        val headers = HttpHeaders()
        headers["x-authenticated-scope"] = "admin"
        val entity: HttpEntity<String> = HttpEntity("body", headers)
        restTemplate.exchange(
            "/api/v1/hc/scopes/admin",
            GET,
            entity,
            String::class.java)
            .body shouldBe "This is the info for users with scope admin."
    }
}