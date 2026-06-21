package com.fortuneterm.journeyledger.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<String> handleEmailAlreadyExistsException(EmailAlreadyExistsException ex) {
        //Status 409
        return ResponseEntity.status(HttpStatus.CONFLICT)
        .body(ex.getMessage());
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<String> InvalidCredentialsException(InvalidCredentialsException ex) {
        //Status 401
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
        .body(ex.getMessage());
    }
}
