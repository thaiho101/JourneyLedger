package com.fortuneterm.journeyledger.repository;

import com.fortuneterm.journeyledger.entity.Journey;
import com.fortuneterm.journeyledger.entity.Transaction;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long>{
    Optional<Transaction> findById(Long id);

    List<Transaction> findByJourney(Journey journey);

    Optional<Transaction> findByIdAndJourney(Long id, Journey journey);
}
