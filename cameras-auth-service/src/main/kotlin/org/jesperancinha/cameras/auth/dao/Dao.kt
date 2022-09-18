package org.jesperancinha.cameras.auth.dao

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import org.springframework.data.repository.kotlin.CoroutineCrudRepository

@Table(name = "hc_user")
class HcUser(
    @Id
    val username: String,
    val password_hash: String,
    val roles: String
)

interface UserRepository : CoroutineCrudRepository<HcUser, String> {
    suspend fun findByUsername(username: String): HcUser?
}