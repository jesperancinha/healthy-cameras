package org.jesperancinha.cameras.cameraservice.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.web.server.SecurityWebFilterChain


/**
 * Created by jofisaes on 02/10/2022
 */
@Configuration
class SecurityConfiguration {

    @Bean
    fun securityWebFilterChain(httpSecurity: ServerHttpSecurity): SecurityWebFilterChain {
        return httpSecurity
            .csrf().disable()
            .authorizeExchange()
            .pathMatchers("/**")
            .permitAll()
            .and()
            .build()
    }
}
