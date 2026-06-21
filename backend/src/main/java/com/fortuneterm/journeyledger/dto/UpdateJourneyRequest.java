package com.fortuneterm.journeyledger.dto;

import java.time.LocalDate;

import com.fortuneterm.journeyledger.enums.Currency;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateJourneyRequest {
    private Long id;

    @NotBlank
    private String journeyName;
    
    @NotBlank
    private String originCountry;
    
    @NotBlank
    private String destinationCountry;
    
    @NotNull
    private LocalDate fromDate;
    
    @NotNull
    private LocalDate toDate;

    @NotNull
    private Currency defaultCurrency;
}
