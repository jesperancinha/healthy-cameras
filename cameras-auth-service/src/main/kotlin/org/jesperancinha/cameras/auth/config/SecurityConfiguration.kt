package org.jesperancinha.cameras.auth.config

import kotlinx.coroutines.*
import kotlinx.coroutines.flow.toList
import org.jesperancinha.cameras.auth.dao.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.core.GrantedAuthorityDefaults
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.*
import org.springframework.security.core.userdetails.User.withDefaultPasswordEncoder
import org.springframework.security.crypto.bcrypt.BCrypt
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.server.SecurityWebFilterChain
import org.springframework.stereotype.Component
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono
import java.util.StringJoiner


/**
 * Created by jofisaes on 07/08/2022
 */
@Configuration
class SecurityConfiguration {

    @Bean
    fun securityWebFilterChain(httpSecurity: ServerHttpSecurity): SecurityWebFilterChain {
        return httpSecurity
            .csrf().disable()
            .authorizeExchange()
            .pathMatchers("/webjars/**")
            .permitAll()
            .pathMatchers("/logout")
            .permitAll()
            .pathMatchers("/logout/**")
            .permitAll()
            .pathMatchers("/v3/**")
            .permitAll()
            .pathMatchers("/actuator/**")
            .permitAll()
            .anyExchange()
            .authenticated()
            .and().formLogin()
            .and()
            .build()
    }
}

@Component
class CustomPasswordEncoder : PasswordEncoder {
    override fun encode(plainTextPassword: CharSequence): String {
        return BCrypt.hashpw(plainTextPassword.toString(), BCrypt.gensalt(8))
    }

    override fun matches(plainTextPassword: CharSequence, passwordInDatabase: String): Boolean {
        return BCrypt.checkpw(plainTextPassword.toString(), passwordInDatabase)
    }
}

@Service
class UserService @Autowired constructor(
    val userRepository: UserRepository,
    val customPasswordEncoder: CustomPasswordEncoder,
    @Value("\${hc.auth.guest.user}")
    val guestUser: String,
    @Value("\${hc.auth.guest.password}")
    val guestPassword: String
) : MapReactiveUserDetailsService(
    User.builder()
        .username(guestUser)
        .password(guestPassword)
        .roles("NONE")
        .build()
) {
    override fun findByUsername(username: String): Mono<UserDetails> =
        Mono.just(
            when (username) {
                guestUser -> User(guestUser, guestPassword, emptyList())
                else -> runBlocking {
                    userRepository.findByUsername(username)
                }?.let { user ->
                    User(
                        user.username,
                        user.password_hash,
                        user.roles.split(",").map { GrantedAuthority { it } }
                    )
                }
            } ?: throw RuntimeException("User $username not found!}"))
}