package com.fortuneterm.journeyledger.dto;

import com.fortuneterm.journeyledger.enums.JourneyPermission;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateJourneyPermissionRequest {
    @NotNull(message = "Permission is required")
    private JourneyPermission permission;
}
