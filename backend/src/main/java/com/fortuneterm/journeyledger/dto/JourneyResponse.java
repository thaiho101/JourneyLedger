package com.fortuneterm.journeyledger.dto;

import java.time.LocalDate;

import com.fortuneterm.journeyledger.enums.Currency;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JourneyResponse {
    private Long id;
    private String journeyName;
    private String originCountry;
    private String destinationCountry;
    private LocalDate fromDate;
    private LocalDate toDate;
    private Currency defaultCurrency;
    private boolean shared;
    private int sharedUserCount;
}
