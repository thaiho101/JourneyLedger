package com.fortuneterm.journeyledger.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.fortuneterm.journeyledger.dto.CreateTransactionRequest;
import com.fortuneterm.journeyledger.dto.TransactionResponse;
import com.fortuneterm.journeyledger.dto.UpdateTransactionRequest;
import com.fortuneterm.journeyledger.entity.Journey;
import com.fortuneterm.journeyledger.entity.Transaction;
import com.fortuneterm.journeyledger.entity.User;
import com.fortuneterm.journeyledger.exception.InvalidCredentialsException;
import com.fortuneterm.journeyledger.exception.JourneyIdNotFoundException;
import com.fortuneterm.journeyledger.exception.TransactionNotFoundException;
import com.fortuneterm.journeyledger.exception.UserNotFoundException;
import com.fortuneterm.journeyledger.repository.JourneyRepository;
import com.fortuneterm.journeyledger.repository.TransactionRepository;
import com.fortuneterm.journeyledger.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final UserRepository userRepository;
    private final JourneyRepository journeyRepository;
    private final TransactionRepository transactionRepository;

    public TransactionResponse createTransaction(Long id, CreateTransactionRequest req, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found"));

        Long userId = user.getId();

        Journey journey = journeyRepository.findById(id).orElseThrow(() -> new JourneyIdNotFoundException("Journey not found"));

        if (!userId.equals(journey.getUser().getId())) {
            throw new InvalidCredentialsException("You do not have access to create this transaction");
        }

        Transaction transaction = new Transaction();
        transaction.setJourney(journey);
        transaction.setAmount(req.getAmount());
        transaction.setDescription(req.getDescription());
        transaction.setCurrency(req.getCurrency());
        transaction.setType(req.getType());
        transaction.setTransactionDate(req.getTransactionDate());
        transaction.setCategory(req.getCategory());

        Transaction savedTrans = transactionRepository.save(transaction);

        TransactionResponse res = new TransactionResponse();
        res.setId(savedTrans.getId());
        res.setAmount(savedTrans.getAmount());
        res.setDescription(savedTrans.getDescription());
        res.setCurrency(savedTrans.getCurrency());
        res.setType(savedTrans.getType());
        res.setTransactionDate(savedTrans.getTransactionDate());
        res.setCategory(savedTrans.getCategory());

        return res;
    }

    public List<TransactionResponse> getTransactionByJourney(Long id, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found"));
        Long userId = user.getId();

        Journey journey = journeyRepository.findById(id).orElseThrow(() -> new JourneyIdNotFoundException("Journey not found"));

        if (!userId.equals(journey.getUser().getId())) {
            throw new InvalidCredentialsException("You do not have access to this transaction");
        }

        List<Transaction> transactions = transactionRepository.findByJourney(journey);
        
        List<TransactionResponse> responses = new ArrayList<>();

        for (Transaction transaction : transactions) {
            TransactionResponse res = new TransactionResponse();
            res.setId(transaction.getId());
            res.setAmount(transaction.getAmount());
            res.setDescription(transaction.getDescription());
            res.setCurrency(transaction.getCurrency());
            res.setType(transaction.getType());
            res.setTransactionDate(transaction.getTransactionDate());
            res.setCategory((transaction.getCategory()));

            responses.add(res);
        }
        return responses;
    }

    public TransactionResponse getTransactionById(Long journeyId, Long transactionId, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found"));
        Long userId = user.getId();

        Journey journey = journeyRepository.findById(journeyId).orElseThrow(() -> new JourneyIdNotFoundException("Journey not found"));

        if (!userId.equals(journey.getUser().getId())) {
            throw new InvalidCredentialsException("You do not have to access this transaction");
        }

        Transaction transaction = transactionRepository.findByIdAndJourney(transactionId, journey).orElseThrow(() -> new TransactionNotFoundException("Transaction not found"));

        TransactionResponse res = new TransactionResponse();
        res.setId(transaction.getId());
        res.setAmount(transaction.getAmount());
        res.setDescription(transaction.getDescription());
        res.setCurrency(transaction.getCurrency());
        res.setType(transaction.getType());
        res.setTransactionDate(transaction.getTransactionDate());
        res.setCategory(transaction.getCategory());

        return res;
    }

    public TransactionResponse updateTransaction(Long journeyId, Long transactionId, Authentication authentication, UpdateTransactionRequest req) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found"));
        Long userId = user.getId();

        Journey journey = journeyRepository.findById(journeyId).orElseThrow(() -> new JourneyIdNotFoundException("Journey not found"));

        if (!userId.equals(journey.getUser().getId())) {
            throw new InvalidCredentialsException("You do not have to modify this transaction");
        }

        Transaction transaction = transactionRepository.findByIdAndJourney(transactionId, journey).orElseThrow(() -> new TransactionNotFoundException("Transaction not found"));

        transaction.setAmount(req.getAmount());
        transaction.setDescription(req.getDescription());
        transaction.setCurrency(req.getCurrency());
        transaction.setType(req.getType());
        transaction.setTransactionDate(req.getTransactionDate());
        transaction.setCategory(req.getCategory());

        Transaction savedTransaction = transactionRepository.save(transaction);

        TransactionResponse res = new TransactionResponse();
        res.setId(savedTransaction.getId());
        res.setAmount(savedTransaction.getAmount());
        res.setDescription(savedTransaction.getDescription());
        res.setCurrency(savedTransaction.getCurrency());
        res.setType(savedTransaction.getType());
        res.setTransactionDate(savedTransaction.getTransactionDate());
        res.setCategory(savedTransaction.getCategory());

        return res;
    }

    public void deleteTransaction(Long journeyId, Long transactionId, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found"));
        Long userId = user.getId();

        Journey journey = journeyRepository.findById(journeyId).orElseThrow(() -> new JourneyIdNotFoundException("Journey not found"));

        if (!userId.equals(journey.getUser().getId())) {
            throw new InvalidCredentialsException("You do not have to modify this transaction");
        }

        Transaction transaction = transactionRepository.findByIdAndJourney(transactionId, journey).orElseThrow(() -> new TransactionNotFoundException("Transaction not found"));

        transactionRepository.delete(transaction);
    }
}
