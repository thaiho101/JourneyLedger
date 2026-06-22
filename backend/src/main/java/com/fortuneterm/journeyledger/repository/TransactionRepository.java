package com.fortuneterm.journeyledger.repository;

import com.fortuneterm.journeyledger.entity.Journey;
import com.fortuneterm.journeyledger.entity.Transaction;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface TransactionRepository extends JpaRepository<Transaction, Long>{
    Optional<Transaction> findById(Long id);

    List<Transaction> findByJourney(Journey journey);

    Optional<Transaction> findByIdAndJourney(Long id, Journey journey);

    @Query("""
                SELECT t.category, SUM(t.amount)
                FROM Transaction t
                WHERE t.journey.id = :journeyId
                AND t.type = com.fortuneterm.journeyledger.enums.TransactionType.EXPENSE
                GROUP BY t.category
            """)
            List<Object[]> findExpenseSummaryByCategory(@Param("journeyId") Long journeyId);
}
