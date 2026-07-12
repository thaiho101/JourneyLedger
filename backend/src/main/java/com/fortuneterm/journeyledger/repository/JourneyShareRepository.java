package com.fortuneterm.journeyledger.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fortuneterm.journeyledger.entity.Journey;
import com.fortuneterm.journeyledger.entity.JourneyShare;
import com.fortuneterm.journeyledger.entity.User;
import com.fortuneterm.journeyledger.enums.JourneyPermission;

public interface JourneyShareRepository extends JpaRepository<JourneyShare, Long> {
    List<JourneyShare> findByJourney(Journey journey);

    List<JourneyShare> findByUser(User user);

    Optional<JourneyShare> findByJourneyAndUser(Journey journey, User user);

    boolean existsByJourneyAndUser(Journey journey, User user);

    boolean existsByJourneyAndUserAndPermission(Journey journey, User user, JourneyPermission permission);

    void deleteByJourneyAndUser(Journey journey, User user);

    boolean existsByJourney(Journey journey);

    long countByJourney(Journey journey);
}
