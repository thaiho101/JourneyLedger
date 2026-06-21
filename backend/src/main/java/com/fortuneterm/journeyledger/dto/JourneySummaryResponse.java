package com.fortuneterm.journeyledger.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JourneySummaryResponse {
    private BigDecimal totalDeposit;
    private BigDecimal totalExpense;
    private BigDecimal balance;
}
