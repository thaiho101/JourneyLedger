package com.fortuneterm.journeyledger.service;

import org.springframework.stereotype.Service;
import com.fortuneterm.journeyledger.entity.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {
    private static final String SECRET_KEY = "my-super-secret-key-for-journeyledger-application-123456";
    
    private static final long EXPIRATION_TIME = 1000 * 60 * 60; //1 hour

    public String generateToken(User user) {
        return Jwts.builder()
                    .subject(user.getEmail())
                    .issuedAt(new Date())
                    .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                    .signWith(getSigningKey())
                    .compact();
    }

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(
            SECRET_KEY.getBytes(StandardCharsets.UTF_8)
        );
    }

    public String extractEmail(String token) {
        return Jwts.parser().verifyWith((javax.crypto.SecretKey) getSigningKey()).build().parseSignedClaims(token).getPayload().getSubject();
    }

    public boolean isTokenValid(String token) {
        try {
            extractEmail(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
