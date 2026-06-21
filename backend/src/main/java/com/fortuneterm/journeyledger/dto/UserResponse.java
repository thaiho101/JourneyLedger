package com.fortuneterm.journeyledger.dto;

import com.fortuneterm.journeyledger.enums.Currency;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {
    private String firstName;
    private String lastName;
    private String email;
    private Currency preferredCurrency;
}
