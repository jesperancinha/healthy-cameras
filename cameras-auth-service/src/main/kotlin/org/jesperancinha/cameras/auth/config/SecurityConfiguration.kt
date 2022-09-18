package org.jesperancinha.cameras.auth.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.core.userdetails.MapReactiveUserDetailsService
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.web.server.SecurityWebFilterChain


/**
 * Created by jofisaes on 07/08/2022
 */
@Configuration
class SecurityConfiguration{

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


    @Bean
    fun userDetailsService(): MapReactiveUserDetailsService? {
        val user: UserDetails = User.builder()
            .username("user")
            .password("{noop}user")
            .roles("USER")
            .build()
        val admin: UserDetails = User.builder()
            .username("admin")
            .password("{noop}admin")
            .roles("ADMIN")
            .build()
        return MapReactiveUserDetailsService(user, admin)
    }
}

