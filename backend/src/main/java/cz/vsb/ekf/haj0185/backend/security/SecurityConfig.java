package cz.vsb.ekf.haj0185.backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        http.authorizeHttpRequests(configurer ->
                configurer
                        .requestMatchers(HttpMethod.POST,"/api/books").hasRole("admin")
                        .requestMatchers(HttpMethod.DELETE,"/api/books/*").hasRole("admin")
                        .requestMatchers(HttpMethod.POST,"/api/authors").hasRole("admin")
                        .requestMatchers(HttpMethod.GET,"/api/customers").hasRole("admin")
                        .requestMatchers(HttpMethod.DELETE,"/api/customers/*").hasRole("admin")
                        .requestMatchers(HttpMethod.GET,"/api/orders").hasRole("admin")
                        .anyRequest().permitAll()

        );

        http.httpBasic(Customizer.withDefaults());

        http.csrf(csrf -> csrf.disable());

        return http.build();
    }

    @Bean
    public InMemoryUserDetailsManager userDetailsManager() {
        UserDetails admin = User.builder()
                .username("admin")
                .password("{noop}admin")
                .roles("admin")
                .build();

        return new InMemoryUserDetailsManager(admin);
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
