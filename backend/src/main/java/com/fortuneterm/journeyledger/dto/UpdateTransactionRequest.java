package com.fortuneterm.journeyledger.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fortuneterm.journeyledger.enums.Currency;
import com.fortuneterm.journeyledger.enums.TransactionCategory;
import com.fortuneterm.journeyledger.enums.TransactionType;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateTransactionRequest {
    @NotNull
    @Positive
    private BigDecimal amount;
    
    private String description;
    
    @NotNull
    private Currency currency;
    
    @NotNull
    private TransactionType type;
    
    @NotNull
    private LocalDateTime transactionDate;

    @NotNull(message = "Category is required")
    private TransactionCategory category;
}
