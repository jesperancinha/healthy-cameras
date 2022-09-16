package org.jesperancinha.cameras.auth.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.client.oidc.web.server.logout.OidcClientInitiatedServerLogoutSuccessHandler;
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.util.matcher.ServerWebExchangeMatchers;

/**
 * Created by jofisaes on 07/08/2022
 */
@Configuration
public class SecurityConfiguration {

    @Value("${okta.oauth2.post-logout-redirect-uri}")
    private String postLogoutRedirectUrl;

    final
    ReactiveClientRegistrationRepository clientRegistrationRepository;

    public SecurityConfiguration(ReactiveClientRegistrationRepository clientRegistrationRepository) {
        this.clientRegistrationRepository = clientRegistrationRepository;
    }

    OidcClientInitiatedServerLogoutSuccessHandler oidcLogoutSuccessHandler() {
        OidcClientInitiatedServerLogoutSuccessHandler successHandler = new OidcClientInitiatedServerLogoutSuccessHandler(clientRegistrationRepository);
        successHandler.setPostLogoutRedirectUri(postLogoutRedirectUrl);
        return successHandler;
    }

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity httpSecurity) {
        return httpSecurity
                .logout()
                .logoutUrl("/logout").requiresLogout(ServerWebExchangeMatchers.pathMatchers(HttpMethod.GET, "/signout"))
                .logoutSuccessHandler(oidcLogoutSuccessHandler())
                .and()
                .csrf().disable()
                .authorizeExchange(authorize ->
                authorize
                        .pathMatchers("/webjars/**")
                        .permitAll()
                        .pathMatchers("/logout")
                        .permitAll()
                        .pathMatchers("/logout/**")
                        .permitAll()
                        .pathMatchers("/info/jwt/open/**")
                        .permitAll()
                        .pathMatchers("/webcams/jwt/open/**")
                        .permitAll()
                        .pathMatchers("/v3/**")
                        .permitAll()
                        .pathMatchers("/actuator/**")
                        .permitAll()
                        .anyExchange()
                        .authenticated()
                        .and().oauth2ResourceServer().jwt()).build();

    }
}
