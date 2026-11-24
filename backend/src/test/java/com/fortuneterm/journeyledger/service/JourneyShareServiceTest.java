package com.fortuneterm.journeyledger.service;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.fortuneterm.journeyledger.dto.ShareJourneyRequest;
import com.fortuneterm.journeyledger.dto.ShareJourneyResponse;
import com.fortuneterm.journeyledger.entity.Journey;
import com.fortuneterm.journeyledger.entity.JourneyShare;
import com.fortuneterm.journeyledger.entity.User;
import com.fortuneterm.journeyledger.enums.JourneyPermission;
import com.fortuneterm.journeyledger.exception.InvalidCredentialsException;
import com.fortuneterm.journeyledger.repository.JourneyRepository;
import com.fortuneterm.journeyledger.repository.JourneyShareRepository;
import com.fortuneterm.journeyledger.repository.UserRepository;

import org.springframework.security.core.Authentication;


@ExtendWith(MockitoExtension.class)
class JourneyShareServiceTest {
    // Run all tests:
    // ./mvnw test
    //
    // Run this class:
    // ./mvnw -Dtest=JourneyShareServiceTest test
    //
    // Run one test:
    // ./mvnw -Dtest=JourneyShareServiceTest#methodName test
    
    @Mock
    private JourneyRepository journeyRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private JourneyShareRepository journeyShareRepository;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private JourneyShareService journeyShareService;

    @Test
    void validateReadAccess_shouldAllowOwner() {
        //Given
        User owner = new User();
        owner.setId(1L);

        Journey journey = new Journey();
        journey.setUser(owner);

        //When + Then
        assertDoesNotThrow(() -> 
            journeyShareService.validateReadAccess(journey, owner)
        );

        verifyNoInteractions(journeyShareRepository);
    }

    @Test
    void validateReadAccess_shouldAllowSharedUserWithReadPermission() {
        User owner = new User();
        owner.setId(1L);

        User sharedUser = new User();
        sharedUser.setId(2L);

        Journey journey = new Journey();
        journey.setUser(owner);

        JourneyShare journeyShare = new JourneyShare();
        journeyShare.setJourney(journey);
        journeyShare.setUser(sharedUser);
        journeyShare.setPermission(JourneyPermission.READ);

        when(
            journeyShareRepository.findByJourneyAndUser(journey, sharedUser)
        ).thenReturn(Optional.of(journeyShare));

        assertDoesNotThrow(() ->
            journeyShareService.validateReadAccess(journey, sharedUser)
        );
    }

    @Test
    void validateReadAccess_shouldAllowSharedUserWithEditPermission() {
        User owner = new User();
        owner.setId(1L);

        User sharedUser = new User();
        sharedUser.setId(3L);

        Journey journey = new Journey();
        journey.setUser(owner);

        JourneyShare journeyShare = new JourneyShare();
        journeyShare.setJourney(journey);
        journeyShare.setUser(sharedUser);
        journeyShare.setPermission(JourneyPermission.EDIT);

        when(
            journeyShareRepository.findByJourneyAndUser(journey, sharedUser)
        ).thenReturn(Optional.of(journeyShare));

        assertDoesNotThrow(() ->
            journeyShareService.validateReadAccess(journey, sharedUser)
        );
    }

    @Test
    void validateReadAccess_shouldRejectUserWithoutShare() {
        User owner = new User();
        owner.setId(1L);

        User otherUser = new User();
        otherUser.setId(4L);

        Journey journey = new Journey();
        journey.setUser(owner);

        when(
            journeyShareRepository.findByJourneyAndUser(journey, otherUser)
        ).thenReturn(Optional.empty());

        assertThrows(InvalidCredentialsException.class, 
            () -> journeyShareService.validateReadAccess(journey, otherUser)
        );
    }

    @Test
    void validateEditAccess_shouldAllowOwner() {
        User owner = new User();
        owner.setId(1L);

        Journey journey = new Journey();
        journey.setUser(owner);

        assertDoesNotThrow(() ->
            journeyShareService.validateEditAccess(journey, owner)
        );

        verifyNoInteractions(journeyShareRepository);
    }

    @Test
    void validateEditAccess_shouldAllowSharedUserWithEditPermission() {
        User owner = new User();
        owner.setId(1L);

        User sharedUser = new User();
        sharedUser.setId(2L);

        Journey journey = new Journey();
        journey.setUser(owner);

        JourneyShare journeyShare = new JourneyShare();
        journeyShare.setJourney(journey);
        journeyShare.setUser(sharedUser);
        journeyShare.setPermission(JourneyPermission.EDIT);

        when(
            journeyShareRepository.findByJourneyAndUser(journey, sharedUser)
        ).thenReturn(Optional.of(journeyShare));

        assertDoesNotThrow(() ->
            journeyShareService.validateEditAccess(journey, sharedUser)
        );
    }

    @Test
    void validateEditAccess_shouldRejectSharedUserWithReadPermission() {
        User owner = new User();
        owner.setId(1L);

        User sharedUser = new User();
        sharedUser.setId(2L);

        Journey journey = new Journey();
        journey.setUser(owner);

        JourneyShare journeyShare = new JourneyShare();
        journeyShare.setJourney(journey);
        journeyShare.setUser(sharedUser);
        journeyShare.setPermission(JourneyPermission.READ);

        when(
            journeyShareRepository.findByJourneyAndUser(journey, sharedUser)
        ).thenReturn(Optional.of(journeyShare));

        assertThrows(InvalidCredentialsException.class, 
            () -> journeyShareService.validateEditAccess(journey, sharedUser)
        );
    }

    @Test
    void validateEditAccess_shouldRejectUserWithoutShare() {
        User owner = new User();
        owner.setId(1L);

        User other = new User();
        other.setId(2L);

        Journey journey = new Journey();
        journey.setUser(owner);

        when(
            journeyShareRepository.findByJourneyAndUser(journey, other)
        ).thenReturn(Optional.empty());

        assertThrows(InvalidCredentialsException.class, 
            () -> journeyShareService.validateEditAccess(journey, other)
        );
    }

    @Test
    void validateOwnerAccess_shouldAllowOwner() {
        User owner = new User();
        owner.setId(1L);

        Journey journey = new Journey();
        journey.setUser(owner);

        assertDoesNotThrow(() ->
            journeyShareService.validateOwnerAccess(journey, owner)
        );

        verifyNoInteractions(journeyShareRepository);
    }

    @Test
    void validateOwnerAccess_shouldRejectNonOwner() {
        User owner = new User();
        owner.setId(1L);

        User other = new User();
        other.setId(2L);

        Journey journey = new Journey();
        journey.setUser(owner);

        assertThrows(InvalidCredentialsException.class,
            () -> journeyShareService.validateOwnerAccess(journey, other)
        );

        verifyNoInteractions(journeyShareRepository);
    }

    @Test
    void shareJourney_shouldShareSuccessfullyWhenCurrentUserIsOwner() {
        User owner = new User();
        owner.setId(1L);
        owner.setEmail("owner@example.com");

        User sharedUser = new User();
        sharedUser.setId(2L);
        sharedUser.setEmail("friend@example.com");

        Journey journey = new Journey();
        journey.setUser(owner);
        journey.setId(10L);

        ShareJourneyRequest req = new ShareJourneyRequest();
        req.setEmail("friend@example.com");
        req.setPermission(JourneyPermission.READ);

        when(
            authentication.getName()
        ).thenReturn("owner@example.com");

        when(
            userRepository.findByEmail("owner@example.com")
        ).thenReturn(Optional.of(owner));

        when(
            journeyRepository.findById(10L)
        ).thenReturn(Optional.of(journey));

        when(
            userRepository.findByEmail("friend@example.com")
        ).thenReturn(Optional.of(sharedUser));

        when(
            journeyShareRepository.existsByJourneyAndUser(journey, sharedUser)
        ).thenReturn(false);

        when(
            journeyShareRepository.save(any(JourneyShare.class))
        ).thenAnswer(invocation -> invocation.getArgument(0));


        ShareJourneyResponse res = journeyShareService.shareJourney(10L, req, authentication);

        assertEquals(2L, res.getUserId());
        assertEquals("friend@example.com", res.getEmail());
        assertEquals(JourneyPermission.READ, res.getPermission());

        verify(journeyShareRepository).save(any(JourneyShare.class));
    }
}
