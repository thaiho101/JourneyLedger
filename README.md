# JourneyLedger

A full-stack travel expense tracking application built with Spring Boot, React, and MariaDB.

## Features

- User Registration
- User Login with JWT Authentication
- Create, Update, Delete Journeys
- Create, Update, Delete Transactions
- Journey Expense Summary
- User Settings
- Responsive Design
- Raspberry Pi Self-Hosted Deployment

## Tech Stack

### Backend

- Java 17
- Spring Boot 3
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- MariaDB
- Maven

### Frontend

- React
- Vite
- JavaScript
- CSS

### Deployment

- Raspberry Pi 4
- Apache Reverse Proxy
- Cloudflare Tunnel
- Systemd Services

## Screenshots

### Login Page

(Add screenshot here)

### Journey Dashboard

(Add screenshot here)

### Transactions

(Add screenshot here)

## API Endpoints

### Authentication

| Method | Endpoint |
|----------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |

### Journeys

| Method | Endpoint |
|----------|----------|
| GET | /api/journeys |
| POST | /api/journeys |
| PUT | /api/journeys/{id} |
| DELETE | /api/journeys/{id} |

### Transactions

| Method | Endpoint |
|----------|----------|
| GET | /api/journeys/{journeyId}/transactions |
| POST | /api/journeys/{journeyId}/transactions |
| PUT | /api/journeys/{journeyId}/transactions/{transactionId} |
| DELETE | /api/journeys/{journeyId}/transactions/{transactionId} |

## Local Development

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Production Deployment

JourneyLedger is deployed on a Raspberry Pi using:

- Apache Reverse Proxy
- Cloudflare Tunnel
- MariaDB
- Spring Boot Jar
- React Production Build

## Future Improvements

- Email Verification
- Forgot Password
- Exchange Rate Integration
- Dashboard Analytics
- Budget Tracking
- Search & Filtering

## Author

Thai Ho

Software Engineering Graduate  
University of Texas at Arlington

GitHub:
https://github.com/thaiho101
