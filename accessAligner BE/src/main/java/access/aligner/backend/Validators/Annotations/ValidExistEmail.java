package access.aligner.backend.Validators.Annotations;

import access.aligner.backend.Validators.AcceptedUser;
import access.aligner.backend.Validators.EmailValidator;
import access.aligner.backend.Validators.ExistEmailValidator;
import jakarta.validation.Constraint;
import jakarta.validation.GroupSequence;
import jakarta.validation.Payload;
import jakarta.validation.groups.Default;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;

@Target({ElementType.PARAMETER, TYPE, FIELD, ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ExistEmailValidator.class)

public @interface ValidExistEmail {
    String message() default "{Validations.ValidExistEmail}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

}
