package com.LASU.project.Configuration.JWT;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class JWT {

    private final UserDetailsService userDetailsService;
    private static final String Secret_Key = "Thomas_123456789_Thomas_123456789_Thomas_123456789";

    public JWT(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    public String issuedToken(String Subject){
        return issuedToken(Subject, Map.of());
    }
    public String issuedToken(String Subject ,String ...scopes){
        return issuedToken(Subject, Map.of("scopes", scopes));
    }
    public String issuedToken(String Subject , List<String> scopes){
        return issuedToken(Subject, Map.of("scopes", scopes));
    }

    public String issuedToken(
            String subject,
            Map<String , Object> claims
    ){
       String Token = Jwts
                .builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuer("https://Omas.com")
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(Date.from(
                        Instant.now().plus(1 ,
                                ChronoUnit.DAYS)
                ))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();

       return Token;
    }

    public String getSubject(String token){
        return getClaims(token).getSubject();
    }

    private Claims getClaims(String token) {
        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims;
    }

    private Key getSigningKey(){
        return Keys.hmacShaKeyFor(Secret_Key.getBytes());
    }

    public boolean isTokenValid(String jwt, String username) {
        String subject = getSubject(jwt);
        return subject.equals(username) && !isTokenExpired(jwt);

    }

    private boolean isTokenExpired(String jwt) {
        Date today = Date.from(Instant.now());
        return getClaims(jwt).getExpiration().before(today);
    }
}
