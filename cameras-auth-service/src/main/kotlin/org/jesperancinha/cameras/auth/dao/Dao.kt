package org.jesperancinha.cameras.auth.dao

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table

@Table("users")
class Users(
    @Id
    val username: String,
    val passwordHash: String,
    val roles: String
)