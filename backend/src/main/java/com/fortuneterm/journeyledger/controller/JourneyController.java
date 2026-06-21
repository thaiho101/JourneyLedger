package com.fortuneterm.journeyledger.controller;


import java.util.List;

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

import com.fortuneterm.journeyledger.dto.CreateJourneyRequest;
import com.fortuneterm.journeyledger.dto.JourneyResponse;
import com.fortuneterm.journeyledger.dto.JourneySummaryResponse;
import com.fortuneterm.journeyledger.dto.UpdateJourneyRequest;
import com.fortuneterm.journeyledger.service.JourneyService;

import jakarta.validation.Valid;

import com.fortuneterm.journeyledger.entity.Journey;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/journeys")
@RequiredArgsConstructor
public class JourneyController {
    private final JourneyService journeyService;

    @PostMapping
    public Journey createJourney(@Valid @RequestBody CreateJourneyRequest req, Authentication authentication) {
        return journeyService.createJourney(req, authentication);
    }

    @GetMapping
    public List<JourneyResponse> getMyJourneys(Authentication authentication) {
        return journeyService.getMyJourneys(authentication);
    }

    @GetMapping("/{journeyId}")
    public JourneyResponse getJourneyById(@PathVariable Long journeyId, Authentication authentication) {
        return journeyService.getJourneyById(journeyId, authentication);
    }

    @PutMapping("/{journeyId}")
    public JourneyResponse updateJourney(@PathVariable Long journeyId, Authentication authentication, @Valid @RequestBody UpdateJourneyRequest req) {
        return  journeyService.updateJourney(journeyId, authentication, req);
    }

    @DeleteMapping("/{journeyId}")
    public ResponseEntity<Void> deleteJourney(@PathVariable Long journeyId, Authentication authentication) {
        journeyService.deleteJourney(journeyId, authentication);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{journeyId}/summary")
    public JourneySummaryResponse getJourneySummary(@PathVariable Long journeyId, Authentication authentication) {
        return journeyService.getJourneySummary(journeyId, authentication);
    }
}
