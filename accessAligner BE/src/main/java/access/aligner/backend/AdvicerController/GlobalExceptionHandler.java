package access.aligner.backend.AdvicerController;

import io.jsonwebtoken.security.SignatureException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.UnexpectedTypeException;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSendException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.naming.ServiceUnavailableException;


@RestControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // detect 500 status error
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ValidationErrorResponse> handleExceptionErrors(
            Exception exception
    ) {
        logger.error("Unhandled exception while processing request", exception);
        ValidationErrorResponse validationErrorResponse = new ValidationErrorResponse();
        validationErrorResponse.setCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
        validationErrorResponse.addError(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "exception", "An unexpected error occurred.");

        return new ResponseEntity<>(validationErrorResponse, HttpStatus.INTERNAL_SERVER_ERROR);

    }
    @ExceptionHandler(UnexpectedTypeException.class)
    public ResponseEntity<ValidationErrorResponse> handleUnexpectedTypeException(
            UnexpectedTypeException exception
    ) {
        ValidationErrorResponse validationErrorResponse = new ValidationErrorResponse();
        validationErrorResponse.setCode(HttpStatus.BAD_REQUEST.value());
        validationErrorResponse.addError(
                HttpStatus.BAD_REQUEST.value(),
                "request",
                "The request contains invalid data."
        );

        return new ResponseEntity<>(validationErrorResponse, HttpStatus.BAD_REQUEST);
    }
    // handle validations errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationErrorResponse> handleValidationErrors(
            MethodArgumentNotValidException ex){

        // Build ValidationErrorResponse with bad request error status
        ValidationErrorResponse validationErrorResponse = new ValidationErrorResponse();
        validationErrorResponse.setCode(HttpStatus.BAD_REQUEST.value());
        // Handle data validations
        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            validationErrorResponse.addError( 400,fieldError.getField(), fieldError.getDefaultMessage());
        }

        // Track object errors
        // Handle specific data validations
        for (ObjectError error : ex.getBindingResult().getGlobalErrors()) {
            if (error.getObjectName().equals("signupRequest")
                    && error.getCode().equals("ValidPasswordMatch")) {
                validationErrorResponse.addError(400,"confirmPassword", error.getDefaultMessage());
            }
            if (error.getObjectName().equals("updateStatusRequest")
                    && error.getCode().equals("ValidStatus")) {
                validationErrorResponse.addError(400,"status", error.getDefaultMessage());
            }
            if (error.getObjectName().equals("securitySettingRequest")
                    && error.getCode().equals("ValidCurrentPassword")) {
                validationErrorResponse.addError(400,"currentPassword", error.getDefaultMessage());
            }
            if (error.getObjectName().equals("patientRequest")
                    && error.getCode().equals("ValidExistPatient")) {
                validationErrorResponse.addError(400,"existPatient", error.getDefaultMessage());
            }
            // check this
            if ( error.getCode().equals("NotEmptyFiles")) {
                validationErrorResponse.addError(400,"files", error.getDefaultMessage());
            }

            if (error.getObjectName().equals("files")
                    && error.getCode().equals("NotEmptyFiles")) {
                validationErrorResponse.addError(400,"files", error.getDefaultMessage());
            }
        }

        return new ResponseEntity<>(validationErrorResponse, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ValidationErrorResponse> ddd(
            ConstraintViolationException ex){

        // Build ValidationErrorResponse with bad request error status
        ValidationErrorResponse validationErrorResponse = new ValidationErrorResponse();
        validationErrorResponse.setCode(HttpStatus.BAD_REQUEST.value());


        // Track object errors
        // Handle specific data validations
        for (ConstraintViolation<?> error : ex.getConstraintViolations()) {
            validationErrorResponse.addError(400,"files", error.getMessage());
        }

        return new ResponseEntity<>(validationErrorResponse, HttpStatus.BAD_REQUEST);
    }
    // handle sign error
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ValidationErrorResponse> handleSignatureErrors(
            AuthenticationException exception) {
        ValidationErrorResponse error =new ValidationErrorResponse();
        error.setCode(HttpStatus.UNAUTHORIZED.value());
        error.addError(HttpStatus.UNAUTHORIZED.value(), "credential", "Authentication failed.");
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler(SignatureException.class)
    public ResponseEntity<ValidationErrorResponse> handleSignatureExceptionErrors(
            SignatureException exception
    ) {
        ValidationErrorResponse validationErrorResponse = new ValidationErrorResponse();
        validationErrorResponse.setCode(HttpStatus.UNAUTHORIZED.value());
        validationErrorResponse.addError(
                HttpStatus.UNAUTHORIZED.value(),
                "token",
                "Invalid or malformed authentication token."
        );

        return new ResponseEntity<>(validationErrorResponse, HttpStatus.UNAUTHORIZED);

    }
    @ExceptionHandler(ServiceUnavailableException.class)
    public ResponseEntity<ValidationErrorResponse> handleServiceUnavailableExceptionErrors(
            ServiceUnavailableException exception
    ) {
        ValidationErrorResponse validationErrorResponse = new ValidationErrorResponse();
        validationErrorResponse.setCode(HttpStatus.SERVICE_UNAVAILABLE.value());
        validationErrorResponse.addError(HttpStatus.SERVICE_UNAVAILABLE.value(), "exception", "Service is temporarily unavailable.");

        return new ResponseEntity<>(validationErrorResponse, HttpStatus.SERVICE_UNAVAILABLE);
    }
    @ExceptionHandler(MailSendException.class)
    public ResponseEntity<ValidationErrorResponse> MailSendExceptionErrors(
            MailSendException exception
    ) {
        ValidationErrorResponse validationErrorResponse = new ValidationErrorResponse();
        validationErrorResponse.setCode(HttpStatus.BAD_REQUEST.value());
        validationErrorResponse.addError(HttpStatus.BAD_REQUEST.value(),
                "email",
                "Invalid address; please validate your email.  ");

        return new ResponseEntity<>(validationErrorResponse, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(InvalidVerificationTokenException.class)
    public ResponseEntity<ValidationErrorResponse> handleInvalidVerificationToken(
            InvalidVerificationTokenException exception
    ) {
        ValidationErrorResponse response = new ValidationErrorResponse();

        response.setCode(HttpStatus.UNAUTHORIZED.value());

        response.addError(
                HttpStatus.UNAUTHORIZED.value(),
                "token",
                "Invalid or expired verification token."
        );

        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ValidationErrorResponse> handleResourceNotFound(
            ResourceNotFoundException exception
    ) {
        ValidationErrorResponse response = new ValidationErrorResponse();

        response.setCode(HttpStatus.NOT_FOUND.value());

        response.addError(
                HttpStatus.NOT_FOUND.value(),
                "resource",
                exception.getMessage()
        );

        return new ResponseEntity<>(
                response,
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ValidationErrorResponse> handleEntityNotFound(EntityNotFoundException exception) {
        ValidationErrorResponse response = new ValidationErrorResponse();
        response.setCode(HttpStatus.NOT_FOUND.value());
        response.addError(HttpStatus.NOT_FOUND.value(), "resource", "Requested resource was not found.");
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ValidationErrorResponse> handleAccessDenied(AccessDeniedException exception) {
        ValidationErrorResponse response = new ValidationErrorResponse();
        response.setCode(HttpStatus.FORBIDDEN.value());
        response.addError(HttpStatus.FORBIDDEN.value(), "authorization", "You are not authorized to access this resource.");
        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }
}
