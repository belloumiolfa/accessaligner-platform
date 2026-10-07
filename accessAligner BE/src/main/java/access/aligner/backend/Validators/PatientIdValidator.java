package access.aligner.backend.Validators;

import access.aligner.backend.Repositories.PatientRepository;
import access.aligner.backend.Validators.Annotations.ValidPatientId;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class PatientIdValidator implements ConstraintValidator<ValidPatientId, Long > {
    private final PatientRepository patientRepository;

    @Override
    public boolean isValid(Long value, ConstraintValidatorContext context) {
        return !patientRepository.findById(value).isEmpty();
    }
}
