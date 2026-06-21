package com.fortuneterm.journeyledger.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.fortuneterm.journeyledger.dto.CreateJourneyRequest;
import com.fortuneterm.journeyledger.dto.JourneyResponse;
import com.fortuneterm.journeyledger.dto.JourneySummaryResponse;
import com.fortuneterm.journeyledger.dto.UpdateJourneyRequest;
import com.fortuneterm.journeyledger.entity.Journey;
import com.fortuneterm.journeyledger.entity.Transaction;
import com.fortuneterm.journeyledger.entity.User;
import com.fortuneterm.journeyledger.enums.TransactionType;
import com.fortuneterm.journeyledger.exception.InvalidCredentialsException;
import com.fortuneterm.journeyledger.exception.JourneyIdNotFoundException;
import com.fortuneterm.journeyledger.exception.UserNotFoundException;
import com.fortuneterm.journeyledger.repository.JourneyRepository;
import com.fortuneterm.journeyledger.repository.TransactionRepository;
import com.fortuneterm.journeyledger.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class JourneyService {
    private final JourneyRepository journeyRepository;
    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;

    public Journey createJourney(CreateJourneyRequest req, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(
            () -> new UserNotFoundException("User not found")
        );

        Journey journey = new Journey();
        journey.setUser(user);
        journey.setJourneyName(req.getJourneyName());
        journey.setOriginCountry(req.getOriginCountry());
        journey.setDestinationCountry(req.getDestinationCountry());
        journey.setFromDate(req.getFromDate());
        journey.setToDate(req.getToDate());
        journey.setDefaultCurrency(req.getDefaultCurrency());

        return journeyRepository.save(journey);
    }

    public List<JourneyResponse> getMyJourneys(Authentication authentication) {
        String email = authentication.getName();

        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found"));

        List<Journey> journeys = journeyRepository.findByUser(user);

        List<JourneyResponse> responses = new ArrayList<>();

        for (Journey journey : journeys) {
            JourneyResponse res = new JourneyResponse();

            res.setId(journey.getId());
            res.setJourneyName(journey.getJourneyName());
            res.setOriginCountry(journey.getOriginCountry());
            res.setDestinationCountry(journey.getDestinationCountry());
            res.setFromDate(journey.getFromDate());
            res.setToDate(journey.getToDate());
            res.setDefaultCurrency(journey.getDefaultCurrency());

            responses.add(res);
        }
        return responses;
    }

    public JourneyResponse getJourneyById(Long id, Authentication authentication) {

        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found"));
        Long userId = user.getId();

        Journey journey = journeyRepository.findById(id).orElseThrow(() -> new JourneyIdNotFoundException("Journey by id not found"));
        
        if (!userId.equals(journey.getUser().getId())) {
            throw new InvalidCredentialsException("You do not have access to this journey");
        }

        JourneyResponse journeyresponse = new JourneyResponse();

        journeyresponse.setId(journey.getId());
        journeyresponse.setJourneyName(journey.getJourneyName());
        journeyresponse.setOriginCountry(journey.getOriginCountry());
        journeyresponse.setDestinationCountry(journey.getDestinationCountry());
        journeyresponse.setFromDate(journey.getFromDate());
        journeyresponse.setToDate(journey.getToDate());
        journeyresponse.setDefaultCurrency(journey.getDefaultCurrency());

        return journeyresponse;
    }

    public JourneyResponse updateJourney(Long journeyId, Authentication authentication, UpdateJourneyRequest req) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found"));
        Long userId = user.getId();

        Journey journey = journeyRepository.findById(journeyId).orElseThrow(() -> new JourneyIdNotFoundException("Journey not found"));

        if (!userId.equals(journey.getUser().getId())) {
            throw new InvalidCredentialsException("You do have not access to update this journey");
        }

        journey.setJourneyName(req.getJourneyName());
        journey.setOriginCountry(req.getOriginCountry());
        journey.setDestinationCountry(req.getDestinationCountry());
        journey.setFromDate(req.getFromDate());
        journey.setToDate(req.getToDate());
        journey.setDefaultCurrency(req.getDefaultCurrency());

        Journey savedJourney = journeyRepository.save(journey);

        JourneyResponse res = new JourneyResponse();
        res.setId(journeyId);
        res.setJourneyName(savedJourney.getJourneyName());
        res.setOriginCountry(savedJourney.getOriginCountry());
        res.setDestinationCountry(savedJourney.getDestinationCountry());
        res.setFromDate(savedJourney.getFromDate());
        res.setToDate(savedJourney.getToDate());
        res.setDefaultCurrency(savedJourney.getDefaultCurrency());
        

        return res;
    }

    public void deleteJourney(Long journeyId, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found"));
        Long userId = user.getId();

        Journey journey = journeyRepository.findById(journeyId).orElseThrow(() -> new JourneyIdNotFoundException("Journey not found"));

        if (!userId.equals(journey.getUser().getId())) {
            throw new InvalidCredentialsException("You do not have to delete this journey");
        }

        journeyRepository.delete(journey);
    }

    public JourneySummaryResponse getJourneySummary(Long journeyId, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found"));
        Long userId = user.getId();

        Journey journey = journeyRepository.findById(journeyId).orElseThrow(() -> new JourneyIdNotFoundException("Journey not found"));

        if (!userId.equals(journey.getUser().getId())) {
            throw new UserNotFoundException("User not found");
        }

        List<Transaction> transactions = transactionRepository.findByJourney(journey);

        BigDecimal totalDeposit = BigDecimal.ZERO;
        BigDecimal totalExpense = BigDecimal.ZERO;

        for (Transaction transaction : transactions) {
            if (transaction.getType() == TransactionType.DEPOSIT) {
                totalDeposit = totalDeposit.add(transaction.getAmount());
            }

            if (transaction.getType() == TransactionType.EXPENSE) {
                totalExpense = totalExpense.add(transaction.getAmount());
            }
        }

        BigDecimal balance = totalDeposit.subtract(totalExpense);

        JourneySummaryResponse res = new JourneySummaryResponse();
        res.setTotalDeposit(totalDeposit);
        res.setTotalExpense(totalExpense);
        res.setBalance(balance);

        return res;
    }
    
}
