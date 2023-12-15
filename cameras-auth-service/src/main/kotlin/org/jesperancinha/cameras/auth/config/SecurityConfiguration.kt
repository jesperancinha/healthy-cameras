package org.jesperancinha.cameras.auth.config

import io.netty.handler.ssl.SslContextBuilder
import io.netty.handler.ssl.util.InsecureTrustManagerFactory
import kotlinx.coroutines.runBlocking
import org.jesperancinha.cameras.auth.dao.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.client.reactive.ReactorClientHttpConnector
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.MapReactiveUserDetailsService
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.crypto.bcrypt.BCrypt
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.server.SecurityWebFilterChain
import org.springframework.stereotype.Component
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient
import reactor.core.publisher.Mono
import reactor.netty.http.client.HttpClient
import reactor.netty.tcp.SslProvider


/**
 * Created by jofisaes on 07/08/2022
 */
@Configuration
class SecurityConfiguration {
    @Bean
    fun securityWebFilterChain(
        @Value("\${hc.csrf.enable:false}")
        csrf: Boolean,
        httpSecurity: ServerHttpSecurity
    ): SecurityWebFilterChain {
        val serverHttpSecurityBuilder = httpSecurity
            .authorizeExchange { exchanges ->
                exchanges
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

            }
            .formLogin { formLogin ->
                formLogin
                    .loginPage("/login")
            }
        if(!csrf){
            serverHttpSecurityBuilder.csrf { it.disable() }
        }
        return serverHttpSecurityBuilder
            .build()
    }

    @Bean
    fun webFluxClient(): WebClient = run {
        val sslContext = SslContextBuilder.forClient().trustManager(InsecureTrustManagerFactory.INSTANCE).build()
        val httpClient: HttpClient = HttpClient.create()
            .secure { sslContextSpec: SslProvider.SslContextSpec ->
                sslContextSpec.sslContext(
                    sslContext
                )
            }
        WebClient.builder().clientConnector(ReactorClientHttpConnector(httpClient)).build()
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
