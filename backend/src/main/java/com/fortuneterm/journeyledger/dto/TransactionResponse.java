package com.fortuneterm.journeyledger.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fortuneterm.journeyledger.enums.TransactionType;
import com.fortuneterm.journeyledger.enums.Currency;
import com.fortuneterm.journeyledger.enums.TransactionCategory;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransactionResponse {
    private Long id;
    private BigDecimal amount;
    private String description;
    private Currency currency;
    private TransactionType type;
    private LocalDateTime transactionDate;
    private TransactionCategory category;
}
