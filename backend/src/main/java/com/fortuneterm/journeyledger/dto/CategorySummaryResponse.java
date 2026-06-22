package com.fortuneterm.journeyledger.dto;

import java.math.BigDecimal;

import com.fortuneterm.journeyledger.enums.TransactionCategory;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CategorySummaryResponse {
    private TransactionCategory category;
    private BigDecimal totalExpense;
    private double percentage;
}
