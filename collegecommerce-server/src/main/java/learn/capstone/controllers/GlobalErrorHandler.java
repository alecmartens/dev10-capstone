package learn.capstone.controllers;

import org.apache.coyote.Response;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.sql.SQLException;
@ControllerAdvice
public class GlobalErrorHandler {
    @ExceptionHandler(SQLException.class)
    public ResponseEntity<Object> handleException(SQLException ex) {
        return new ResponseEntity<>("Internal database error",
                HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<Object> handleException(DataAccessException ex) {
        return new ResponseEntity<>("Database error.",
                HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Object> handleException(HttpMessageNotReadableException ex) {
        return new ResponseEntity<>("JSON error",
                HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<Object> handleException(HttpMediaTypeNotSupportedException ex) {
        ErrorResponse res = new ErrorResponse();
        return new ResponseEntity<>("Content-Type: application/json required",
                HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleException(Exception ex) {
        return new ResponseEntity<>("Error",
                HttpStatus.INTERNAL_SERVER_ERROR);
    }
}