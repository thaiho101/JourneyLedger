package com.fortuneterm.journeyledger.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.fortuneterm.journeyledger.dto.ShareJourneyRequest;
import com.fortuneterm.journeyledger.dto.ShareJourneyResponse;
import com.fortuneterm.journeyledger.dto.SharedJourneyResponse;
import com.fortuneterm.journeyledger.dto.UpdateJourneyPermissionRequest;
import com.fortuneterm.journeyledger.entity.Journey;
import com.fortuneterm.journeyledger.entity.JourneyShare;
import com.fortuneterm.journeyledger.entity.User;
import com.fortuneterm.journeyledger.enums.JourneyPermission;
import com.fortuneterm.journeyledger.exception.InvalidCredentialsException;
import com.fortuneterm.journeyledger.exception.JourneyIdNotFoundException;
import com.fortuneterm.journeyledger.exception.UserNotFoundException;
import com.fortuneterm.journeyledger.repository.JourneyRepository;
import com.fortuneterm.journeyledger.repository.JourneyShareRepository;
import com.fortuneterm.journeyledger.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JourneyShareService {
    private final JourneyRepository journeyRepository;
    private final UserRepository userRepository;
    private final JourneyShareRepository journeyShareRepository;
    
    public ShareJourneyResponse shareJourney(Long journeyId, ShareJourneyRequest req, Authentication authentication) {
        String ownerEmail = authentication.getName();

        User owner = userRepository.findByEmail(ownerEmail)
        .orElseThrow(() -> new UserNotFoundException("User not found"));

        Long userId = owner.getId();

        Journey journey = journeyRepository.findById(journeyId)
        .orElseThrow(() -> new JourneyIdNotFoundException("Journey not found"));

        if (!userId.equals(journey.getUser().getId())) {
            throw new InvalidCredentialsException("Only the journey owner can share this journey");
        }

        User sharedUser = userRepository.findByEmail(req.getEmail())
        .orElseThrow(() -> new UserNotFoundException("User to share with not found"));

        if (sharedUser.getId().equals(owner.getId())) {
            throw new InvalidCredentialsException("You cannot share a journey with yourself");
        }

        if (req.getPermission() == JourneyPermission.OWNER) {
            throw new InvalidCredentialsException("OWNER permission cannot be assigned");
        }

        if (journeyShareRepository.existsByJourneyAndUser(journey, sharedUser)) {
            throw new InvalidCredentialsException("This journey is already shared with this user");
        }

        JourneyShare journeyShare = new JourneyShare();
        journeyShare.setJourney(journey);
        journeyShare.setUser(sharedUser);
        journeyShare.setPermission(req.getPermission());

        journeyShareRepository.save(journeyShare);

        return new ShareJourneyResponse(sharedUser.getId(), sharedUser.getEmail(), journeyShare.getPermission());
    }

    public List<ShareJourneyResponse> getJourneyShares(Long journeyId, Authentication authentication) {
        String ownerEmail = authentication.getName();

        User owner = userRepository.findByEmail(ownerEmail)
                        .orElseThrow(() -> new UserNotFoundException("User not found"));

        Journey journey = journeyRepository.findById(journeyId)
                        .orElseThrow(() -> new JourneyIdNotFoundException("Journey not found"));

        if (!owner.getId().equals(journey.getUser().getId())) {
            throw new InvalidCredentialsException("Only the journey owner can view shared users");
        }

        List<JourneyShare> shares = journeyShareRepository.findByJourney(journey);

        return shares.stream().map(share -> new ShareJourneyResponse(share.getUser().getId(), share.getUser().getEmail(), share.getPermission())).toList();
    }

    public ShareJourneyResponse updatePermission(Long journeyId, Long userId, UpdateJourneyPermissionRequest req, Authentication authentication) {
        String ownerEmail = authentication.getName();

        User owner = userRepository.findByEmail(ownerEmail)
                    .orElseThrow(() -> new UserNotFoundException("User not found"));

        Journey journey = journeyRepository.findById(journeyId)
                    .orElseThrow(() -> new JourneyIdNotFoundException("Journey not found"));

        if (!owner.getId().equals(journey.getUser().getId())) {
            throw new InvalidCredentialsException("Only the journey owner can update sharing permissions");
        }

        User sharedUser = userRepository.findById(userId)
                    .orElseThrow(() -> new UserNotFoundException("Shared user not found"));

        JourneyShare journeyShare = journeyShareRepository.findByJourneyAndUser(journey, sharedUser)
                    .orElseThrow(() -> new InvalidCredentialsException("This journey is not shared with this user"));

        if (req.getPermission() == JourneyPermission.OWNER) {
            throw new InvalidCredentialsException("OWNER permission cannot be assigned");
        }

        journeyShare.setPermission(req.getPermission());
        JourneyShare updatedShare = journeyShareRepository.save(journeyShare);

        return new ShareJourneyResponse(sharedUser.getId(), sharedUser.getEmail(), updatedShare.getPermission());
    }

    public void removeShare(Long journeyId, Long userId, Authentication authentication) {
        String ownerEmail = authentication.getName();

        User owner = userRepository.findByEmail(ownerEmail)
                    .orElseThrow(() -> new UserNotFoundException("User not found"));

        Journey journey = journeyRepository.findById(journeyId)
                    .orElseThrow(() -> new JourneyIdNotFoundException("Journey not found"));

        if (!owner.getId().equals(journey.getUser().getId())) {
            throw new InvalidCredentialsException("Only the journey owner can remove shared users");
        }

        User sharedUser = userRepository.findById(userId)
                    .orElseThrow(() -> new UserNotFoundException("Shared user not found"));

        JourneyShare journeyShare = journeyShareRepository.findByJourneyAndUser(journey, sharedUser)
                    .orElseThrow(() -> new InvalidCredentialsException("This journey is not shared with this user"));

        journeyShareRepository.delete(journeyShare);
    }

    public List<SharedJourneyResponse> getSharedJourneys(Authentication authentication) {
        String currentUserEmail = authentication.getName();

        User currentUser = userRepository.findByEmail(currentUserEmail)
                    .orElseThrow(() -> new UserNotFoundException("User not found"));

        List<JourneyShare> shares = journeyShareRepository.findByUser(currentUser);

        return shares.stream().map(share -> {
            Journey journey = share.getJourney();

            return new SharedJourneyResponse(journey.getId(), 
                                            journey.getJourneyName(), 
                                            journey.getOriginCountry(), 
                                            journey.getDestinationCountry(), 
                                            journey.getFromDate(), 
                                            journey.getToDate(), 
                                            journey.getUser().getEmail(), 
                                            journey.getDefaultCurrency(),
                                            share.getPermission());
        }).toList();
    }

    public void validateOwnerAccess(Journey journey, User currentUser) {
        if (!journey.getUser().getId().equals(currentUser.getId())) {
            throw new InvalidCredentialsException("Only the journey owner can perform this action");
        }
    }

    public void validateReadAccess(Journey journey, User currentUser) {
        if (journey.getUser().getId().equals(currentUser.getId())) {
            return;
        }

        JourneyShare journeyShare = journeyShareRepository.findByJourneyAndUser(journey, currentUser)
                        .orElseThrow(() -> new InvalidCredentialsException("You do not have access to this journey"));

        if (journeyShare.getPermission() != JourneyPermission.READ && journeyShare.getPermission() != JourneyPermission.EDIT) {
            throw new InvalidCredentialsException("You do not have access to this journey");
        }
    }

    public void validateEditAccess(Journey journey, User currentUser) {
        if (journey.getUser().getId().equals(currentUser.getId())) {
            return;
        }

        JourneyShare journeyShare = journeyShareRepository.findByJourneyAndUser(journey, currentUser)
                .orElseThrow(() -> new InvalidCredentialsException("You do not have permission to edit this journey"));

        if (journeyShare.getPermission() != JourneyPermission.EDIT) {
            throw new InvalidCredentialsException("You do not have permission to edit this journey");
        }
    }
}
