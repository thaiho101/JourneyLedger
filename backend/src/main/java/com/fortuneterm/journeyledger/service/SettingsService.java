package com.fortuneterm.journeyledger.service;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.fortuneterm.journeyledger.dto.ChangePasswordRequest;
import com.fortuneterm.journeyledger.entity.User;
import com.fortuneterm.journeyledger.exception.InvalidCredentialsException;
import com.fortuneterm.journeyledger.exception.UserNotFoundException;
import com.fortuneterm.journeyledger.repository.UserRepository;



import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SettingsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void changePassword(ChangePasswordRequest req, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found"));

        if (!passwordEncoder.matches(req.getCurrentPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Current Password id incorrect");
        }

        user.setPassword(passwordEncoder.encode(req.getNewPassword()));

        userRepository.save(user);
    }
}
