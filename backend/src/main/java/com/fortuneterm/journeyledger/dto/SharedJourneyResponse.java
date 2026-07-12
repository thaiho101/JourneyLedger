package com.fortuneterm.journeyledger.dto;

import java.time.LocalDate;

import com.fortuneterm.journeyledger.enums.Currency;
import com.fortuneterm.journeyledger.enums.JourneyPermission;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SharedJourneyResponse {
    private Long journeyId;
    private String journeyName;
    private String originCountry;
    private String destinationCountry;
    private LocalDate fromDate;
    private LocalDate toDate;
    private String ownerEmail;
    private Currency defaultCurrency;
    private JourneyPermission permission;
}
