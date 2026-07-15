package org.jesperancinha.cameras.client.configuration

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.Customizer
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.oauth2.client.oidc.web.server.logout.OidcClientInitiatedServerLogoutSuccessHandler
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository
import org.springframework.security.web.server.SecurityWebFilterChain
import org.springframework.security.web.server.util.matcher.ServerWebExchangeMatchers

@Configuration
class SecurityConfiguration(val clientRegistrationRepository: ReactiveClientRegistrationRepository) {
    @field:Value($$"${camera.service.oauth2.post-logout-redirect-uri}")
    private val postLogoutRedirectUrl: String? = null
    fun oidcLogoutSuccessHandler(): OidcClientInitiatedServerLogoutSuccessHandler {
        val successHandler = OidcClientInitiatedServerLogoutSuccessHandler(
            clientRegistrationRepository
        )
        successHandler.setPostLogoutRedirectUri(postLogoutRedirectUrl)
        return successHandler
    }

    @Bean
    fun securityWebFilterChain(httpSecurity: ServerHttpSecurity): SecurityWebFilterChain {
        return httpSecurity
            .logout { logout ->
                logout
                    .logoutUrl("/logout")
                    .requiresLogout(ServerWebExchangeMatchers.pathMatchers(HttpMethod.GET, "/signout"))
                    .logoutSuccessHandler(oidcLogoutSuccessHandler())
            }
            .csrf { it.disable() }
            .authorizeExchange { exchanges ->
                exchanges
                    .pathMatchers("/webjars/**", "/logout", "/logout/**", "/v3/**", "/actuator/**")
                    .permitAll()
                    .anyExchange()
                    .authenticated()
            }
            .oauth2Login(Customizer.withDefaults())
            .build()
    }

}

