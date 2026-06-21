package com.fortuneterm.journeyledger.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fortuneterm.journeyledger.dto.CreateTransactionRequest;
import com.fortuneterm.journeyledger.dto.TransactionResponse;
import com.fortuneterm.journeyledger.dto.UpdateTransactionRequest;
import com.fortuneterm.journeyledger.service.TransactionService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import java.util.List;

@RestController
@RequestMapping("/api/journeys/{journeyId}/transactions")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;

    @PostMapping
    public TransactionResponse createTransaction(@PathVariable Long journeyId, @Valid @RequestBody CreateTransactionRequest req, Authentication authentication) {
        return transactionService.createTransaction(journeyId, req, authentication);
    }

    @GetMapping
    public List<TransactionResponse> getTransactionByJourney(@PathVariable Long journeyId, Authentication authentication) {
        return transactionService.getTransactionByJourney(journeyId, authentication);
    }

    @GetMapping("/{transactionId}")
    public TransactionResponse getTransactionById(@PathVariable Long journeyId, @PathVariable Long transactionId, Authentication authentication) {
        return transactionService.getTransactionById(journeyId, transactionId, authentication);
    }

    @PutMapping("/{transactionId}")
    public TransactionResponse updateTransaction(@PathVariable Long journeyId, @PathVariable Long transactionId, Authentication authentication, @Valid @RequestBody UpdateTransactionRequest req) {
        return transactionService.updateTransaction(journeyId, transactionId, authentication, req);
    }

    @DeleteMapping("/{transactionId}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long journeyId, @PathVariable Long transactionId, Authentication authentication) {
        transactionService.deleteTransaction(journeyId, transactionId, authentication);
        return ResponseEntity.noContent().build();
    }
}
