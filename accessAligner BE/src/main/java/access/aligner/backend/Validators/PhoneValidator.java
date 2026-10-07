package access.aligner.backend.Validators;

import access.aligner.backend.Validators.Annotations.ValidPhone;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public class PhoneValidator implements ConstraintValidator<ValidPhone, String> {
    //public static final String PHONE_NUMBER_REGEX = "\\d{10}|(?:\\d{3}-){2}\\d{4}|\\(\\d{3}\\)\\d{3}-?\\d{4}";
    public static final String PHONE_NUMBER_REGEX = "5\\d{7}|2\\d{7}|9\\d{7}|7\\d{7}|5\\d{7}";

    @Override
    public boolean isValid(String phone, ConstraintValidatorContext context) {
        return Pattern.compile(PHONE_NUMBER_REGEX)
                .matcher(phone)
                .matches() && phone.length() < 13;
    }
}
