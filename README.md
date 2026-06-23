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

<img width="1512" height="827" alt="image" src="https://github.com/user-attachments/assets/e7ff9f4e-4776-4139-9c49-5e66b033a8b9" />
<img width="338" height="734" alt="image" src="https://github.com/user-attachments/assets/152b1c5f-0b80-4bff-943e-5999e87fd09a" />


### Journey Dashboard

<img width="1512" height="826" alt="image" src="https://github.com/user-attachments/assets/a439d71e-d840-44b9-9a87-5b90ad650b2e" />
<img width="341" height="736" alt="image" src="https://github.com/user-attachments/assets/95a22e5f-a5e2-46c7-8905-61149541d17b" />

### Transactions

<img width="1508" height="828" alt="image" src="https://github.com/user-attachments/assets/cb2668b9-4e4d-40ff-a233-edeaa307d7b1" />
<img width="341" height="736" alt="image" src="https://github.com/user-attachments/assets/4e40a1e9-6c30-487d-b7ce-2b808fcf5405" />


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
| GET | /api/journeys/{journeyId}/transactions/category-summary |
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

Nam Ho

Software Engineering Graduate  
University of Texas at Arlington

GitHub:
https://github.com/thaiho101
