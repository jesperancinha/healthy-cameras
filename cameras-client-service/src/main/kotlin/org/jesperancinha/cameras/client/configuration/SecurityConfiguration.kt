package org.jesperancinha.cameras.client.configuration

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.oauth2.client.AuthorizedClientServiceReactiveOAuth2AuthorizedClientManager
import org.springframework.security.oauth2.client.ClientCredentialsReactiveOAuth2AuthorizedClientProvider
import org.springframework.security.oauth2.client.InMemoryReactiveOAuth2AuthorizedClientService
import org.springframework.security.oauth2.client.oidc.web.server.logout.OidcClientInitiatedServerLogoutSuccessHandler
import org.springframework.security.oauth2.client.registration.InMemoryReactiveClientRegistrationRepository
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizationRequestResolver
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestResolver
import org.springframework.security.oauth2.client.web.reactive.function.client.ServerOAuth2AuthorizedClientExchangeFilterFunction
import org.springframework.security.oauth2.client.web.server.ServerOAuth2AuthorizationRequestResolver
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.security.web.server.SecurityWebFilterChain
import org.springframework.security.web.server.util.matcher.ServerWebExchangeMatchers
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.server.ServerWebExchange
import reactor.core.publisher.Mono

/**
 * Created by jofisaes on 07/08/2022
 */
@Configuration
class SecurityConfiguration(val clientRegistrationRepository: ReactiveClientRegistrationRepository) {
    @Value("\${camera.service.oauth2.post-logout-redirect-uri}")
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
            .logout()
            .logoutUrl("/logout").requiresLogout(ServerWebExchangeMatchers.pathMatchers(HttpMethod.GET, "/signout"))
            .logoutSuccessHandler(oidcLogoutSuccessHandler())
            .and()
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
            .and().oauth2Login()
            .and()
            .build()
    }

}

