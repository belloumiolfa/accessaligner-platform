package access.aligner.backend.Validators.Annotations;

import access.aligner.backend.Validators.PatientIdValidator;
import access.aligner.backend.Validators.PhoneValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;

@Target({ElementType.PARAMETER, TYPE, FIELD, ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PatientIdValidator.class)

public @interface ValidPatientId {
    String message() default "{Validations.ValidExistPatient}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

}
