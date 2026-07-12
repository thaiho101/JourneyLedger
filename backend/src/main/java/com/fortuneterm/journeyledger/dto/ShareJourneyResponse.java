package com.fortuneterm.journeyledger.dto;

import com.fortuneterm.journeyledger.enums.JourneyPermission;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ShareJourneyResponse {
    private String email;
    private JourneyPermission permission;
}
