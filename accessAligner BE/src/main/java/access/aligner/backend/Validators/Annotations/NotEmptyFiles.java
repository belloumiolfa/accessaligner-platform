package access.aligner.backend.Validators.Annotations;

import access.aligner.backend.Validators.CurrentPasswordValidator;
import access.aligner.backend.Validators.NotEmptyFilesValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;

@Target({ElementType.PARAMETER, TYPE, FIELD, ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = NotEmptyFilesValidator.class)

public @interface NotEmptyFiles {
    String message() default "{Validations.NotEmptyFiles}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
