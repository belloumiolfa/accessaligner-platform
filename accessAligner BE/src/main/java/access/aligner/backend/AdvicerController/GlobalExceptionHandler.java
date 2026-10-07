package access.aligner.backend.AdvicerController;

import io.jsonwebtoken.security.SignatureException;
import jakarta.mail.SendFailedException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.UnexpectedTypeException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSendException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.naming.ServiceUnavailableException;


@RestControllerAdvice
public class GlobalExceptionHandler {
    // detect 500 status error
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ValidationErrorResponse> handleExceptionErrors(
            Exception exception
    ) {
        ValidationErrorResponse validationErrorResponse = new ValidationErrorResponse();
        validationErrorResponse.setCode(HttpStatus.INTERNAL_SERVER_ERROR.hashCode());
        validationErrorResponse.addError(HttpStatus.INTERNAL_SERVER_ERROR.hashCode(),
                "exception", exception.getMessage());

        return new ResponseEntity<>(validationErrorResponse, HttpStatus.INTERNAL_SERVER_ERROR);

    }
    public ResponseEntity<ValidationErrorResponse> UnexpectedTypeExceptionErrors(
            UnexpectedTypeException exception
    ) {
        ValidationErrorResponse validationErrorResponse = new ValidationErrorResponse();
        validationErrorResponse.setCode(HttpStatus.BAD_REQUEST.hashCode());
        validationErrorResponse.addError(HttpStatus.BAD_REQUEST.hashCode(),"exception", exception.getMessage());

        return new ResponseEntity<>(validationErrorResponse, HttpStatus.BAD_REQUEST);
    }
    // handle validations errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationErrorResponse> handleValidationErrors(
            MethodArgumentNotValidException ex){

        // Build ValidationErrorResponse with bad request error status
        ValidationErrorResponse validationErrorResponse = new ValidationErrorResponse();
        validationErrorResponse.setCode(HttpStatus.BAD_REQUEST.hashCode());
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
        validationErrorResponse.setCode(HttpStatus.BAD_REQUEST.hashCode());


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
        // Build ValidationErrorResponse
        ValidationErrorResponse error =new ValidationErrorResponse();

        // Adapt the exception to return bad request error
        error.setCode(exception.hashCode());
        error.addError( 400,"credential", exception.getMessage());

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(SignatureException.class)
    public ResponseEntity<ValidationErrorResponse> handleSignatureExceptionErrors(
            SignatureException exception
    ) {
        ValidationErrorResponse validationErrorResponse = new ValidationErrorResponse();
        validationErrorResponse.setCode(exception.hashCode());
        validationErrorResponse.addError(exception.hashCode(),"exception", exception.getMessage());

        return new ResponseEntity<>(validationErrorResponse, HttpStatusCode.valueOf(exception.hashCode()));

    }
    @ExceptionHandler(ServiceUnavailableException.class)
    public ResponseEntity<ValidationErrorResponse> handleServiceUnavailableExceptionErrors(
            ServiceUnavailableException exception
    ) {
        ValidationErrorResponse validationErrorResponse = new ValidationErrorResponse();
        validationErrorResponse.setCode(HttpStatus.SERVICE_UNAVAILABLE.hashCode());
        validationErrorResponse.addError(HttpStatus.SERVICE_UNAVAILABLE.hashCode(), "exception", exception.getMessage());

        return new ResponseEntity<>(validationErrorResponse, HttpStatus.SERVICE_UNAVAILABLE);
    }
    @ExceptionHandler(MailSendException.class)
    public ResponseEntity<ValidationErrorResponse> MailSendExceptionErrors(
            MailSendException exception
    ) {
        ValidationErrorResponse validationErrorResponse = new ValidationErrorResponse();
        validationErrorResponse.setCode(HttpStatus.BAD_REQUEST.hashCode());
        validationErrorResponse.addError(HttpStatus.BAD_REQUEST.hashCode(),
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
}
