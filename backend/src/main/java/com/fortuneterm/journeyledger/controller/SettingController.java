package com.fortuneterm.journeyledger.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fortuneterm.journeyledger.dto.ChangePasswordRequest;
import com.fortuneterm.journeyledger.service.SettingsService;

import lombok.RequiredArgsConstructor;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
public class SettingController {

    private final SettingsService settingsService;
    @PutMapping("/password")
    public ResponseEntity<String> changePassword(@Valid @RequestBody ChangePasswordRequest req, Authentication authentication) {
        settingsService.changePassword(req, authentication);
        return ResponseEntity.ok("Password changed successfully");
    } 
}
