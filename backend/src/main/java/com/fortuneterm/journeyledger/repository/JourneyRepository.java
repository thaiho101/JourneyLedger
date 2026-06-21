package com.fortuneterm.journeyledger.repository;

import com.fortuneterm.journeyledger.entity.Journey;
import com.fortuneterm.journeyledger.entity.User;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JourneyRepository extends JpaRepository<Journey, Long> {
    List<Journey> findByUser(User user);

    Optional<Journey> findById(Long id);
}
