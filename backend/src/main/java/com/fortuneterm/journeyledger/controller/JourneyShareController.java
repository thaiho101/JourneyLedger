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

import com.fortuneterm.journeyledger.dto.ShareJourneyRequest;
import com.fortuneterm.journeyledger.dto.ShareJourneyResponse;
import com.fortuneterm.journeyledger.dto.UpdateJourneyPermissionRequest;
import com.fortuneterm.journeyledger.service.JourneyShareService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/journeys/{journeyId}/shares")
@RequiredArgsConstructor
public class JourneyShareController {
    private final JourneyShareService journeyShareService;

    @PostMapping
    public ShareJourneyResponse shareJourney(
        @PathVariable Long journeyId, 
        @Valid @RequestBody ShareJourneyRequest req, 
        Authentication authentication) {

        return journeyShareService.shareJourney(journeyId, req, authentication);

    }

    @GetMapping
    public List<ShareJourneyResponse> getJourneyShares(
        @PathVariable Long journeyId, Authentication authentication
    ) {
        return journeyShareService.getJourneyShares(journeyId, authentication);
    }

    @PutMapping("/{userId}")
    public ShareJourneyResponse updatePermission(
        @PathVariable Long journeyId, 
        @PathVariable Long userId, 
        @Valid @RequestBody UpdateJourneyPermissionRequest req,
        Authentication authentication
    ) {
        return journeyShareService.updatePermission(journeyId, userId, req, authentication);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> removeShare(
        @PathVariable Long journeyId,
        @PathVariable Long userId,
        Authentication authentication
    ) {
        journeyShareService.removeShare(journeyId, userId, authentication);
        return ResponseEntity.noContent().build();
    }
}
