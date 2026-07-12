package com.fortuneterm.journeyledger.dto;

import com.fortuneterm.journeyledger.enums.JourneyPermission;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShareJourneyRequest {

    @NotBlank
    @Email
    private String email;

    @NotNull
    private JourneyPermission permission;
}
