package com.fortuneterm.journeyledger.dto;

import com.fortuneterm.journeyledger.enums.Currency;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;
    
    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;

    @NotNull
    private Currency preferredCurrency;
}
