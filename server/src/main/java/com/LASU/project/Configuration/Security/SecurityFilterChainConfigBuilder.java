package com.LASU.project.Configuration.Security;


import com.LASU.project.Configuration.JWT.JWT_Filter;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.web.AuthenticationEntryPoint;

public class SecurityFilterChainConfigBuilder {
    private AuthenticationProvider authenticationProvider;
    private JWT_Filter jwt_filter;
    private AuthenticationEntryPoint authenticationEntryPoint1;

    public SecurityFilterChainConfigBuilder setAuthenticationProvider(AuthenticationProvider authenticationProvider) {
        this.authenticationProvider = authenticationProvider;
        return this;
    }

    public SecurityFilterChainConfigBuilder setJwt_filter(JWT_Filter jwt_filter) {
        this.jwt_filter = jwt_filter;
        return this;
    }

    public SecurityFilterChainConfigBuilder setAuthenticationEntryPoint1(AuthenticationEntryPoint authenticationEntryPoint1) {
        this.authenticationEntryPoint1 = authenticationEntryPoint1;
        return this;
    }

    public SecurityFilterChainConfig createSecurityFilterChainConfig() {
        return new SecurityFilterChainConfig(authenticationProvider, jwt_filter, authenticationEntryPoint1);
    }
}