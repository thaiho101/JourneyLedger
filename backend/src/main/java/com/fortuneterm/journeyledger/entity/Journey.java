package com.fortuneterm.journeyledger.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fortuneterm.journeyledger.enums.Currency;

import jakarta.persistence.OneToMany;

import java.time.LocalDate;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "journeys")
@Setter
@Getter
public class Journey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "journey_name", nullable = false, length = 100)
    private String journeyName;

    @Column(name = "origin_country", nullable = false, length = 100)
    private String originCountry;
    
    @Column(name = "destination_country", nullable = false, length = 100)
    private String destinationCountry;

    @Column(name = "from_date", nullable = false)
    private LocalDate fromDate;

    @Column(name = "to_date", nullable = false)
    private LocalDate toDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "default_currency", nullable = false)
    private Currency defaultCurrency;

    @OneToMany(mappedBy = "journey", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnore
    private List<Transaction> transactions;
}
