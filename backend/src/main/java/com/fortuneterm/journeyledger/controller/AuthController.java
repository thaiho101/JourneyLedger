package com.fortuneterm.journeyledger.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.fortuneterm.journeyledger.service.AuthService;

import jakarta.validation.Valid;

// import com.fortuneterm.journeyledger.service.JwtService;
import com.fortuneterm.journeyledger.dto.RegisterRequest;
import com.fortuneterm.journeyledger.dto.RegisterResponse;
import com.fortuneterm.journeyledger.dto.UserResponse;
import com.fortuneterm.journeyledger.dto.LoginRequest;
import com.fortuneterm.journeyledger.dto.LoginResponse;

import org.springframework.web.bind.annotation.RequestBody;



import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    // private final JwtService jwtService;

    @PostMapping("/register")
    public RegisterResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest req) {
        return authService.login(req);
    }

    @GetMapping("/me")
    public UserResponse me(Authentication authentication) {


        return authService.getCurrentUser(authentication);

    }
    
}
