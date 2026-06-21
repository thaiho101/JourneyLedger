package com.fortuneterm.journeyledger.service;

import com.fortuneterm.journeyledger.repository.UserRepository;
import com.fortuneterm.journeyledger.dto.RegisterRequest;
import com.fortuneterm.journeyledger.dto.RegisterResponse;
import com.fortuneterm.journeyledger.dto.UserResponse;
import com.fortuneterm.journeyledger.entity.User;
import com.fortuneterm.journeyledger.exception.EmailAlreadyExistsException;
import com.fortuneterm.journeyledger.exception.InvalidCredentialsException;
import com.fortuneterm.journeyledger.exception.UserNotFoundException;
import com.fortuneterm.journeyledger.dto.LoginRequest;
import com.fortuneterm.journeyledger.dto.LoginResponse;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.time.LocalDateTime;

import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    public RegisterResponse register(RegisterRequest req) {
        if (userRepository.findByEmail(req.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email already exists");
        }

        User user = new User();

        user.setFirstName(req.getFirstName());
        user.setLastName(req.getLastName());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setPreferredCurrency(req.getPreferredCurrency());
        user.setDateInitialized(LocalDateTime.now());

        User savedNewUser = userRepository.save(user);

        RegisterResponse res = new RegisterResponse();
        res.setMessage("Register Successful");
        res.setFirstName(savedNewUser.getFirstName());
        res.setLastName(savedNewUser.getLastName());

        return res;
    }

    public LoginResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
        .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        String token = jwtService.generateToken(user);

        return new LoginResponse("Login Sucessful", user.getFirstName(), user.getLastName(), token);
    }

    public UserResponse getCurrentUser(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found"));

        UserResponse res = new UserResponse();
        res.setFirstName(user.getFirstName());
        res.setLastName(user.getLastName());
        res.setEmail(user.getEmail());
        res.setPreferredCurrency(user.getPreferredCurrency());

        return res;
    }
}
