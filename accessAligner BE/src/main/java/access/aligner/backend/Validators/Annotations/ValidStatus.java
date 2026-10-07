package access.aligner.backend.Validators.Annotations;

import access.aligner.backend.Validators.StatusValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;

@Target({ElementType.PARAMETER, TYPE, FIELD, ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = StatusValidator.class)

public @interface ValidStatus {
    String message() default "{Validations.ValidStatus}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

}
