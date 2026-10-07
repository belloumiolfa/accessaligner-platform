package access.aligner.backend.Validators;

import access.aligner.backend.DTOs.Requests.PatientRequest;
import access.aligner.backend.Entities.Patient;
import access.aligner.backend.Repositories.PatientRepository;
import access.aligner.backend.Validators.Annotations.ValidExistPatient;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@RequiredArgsConstructor

public class ExistPatientValidator implements ConstraintValidator<ValidExistPatient, PatientRequest> {
    private final PatientRepository patientRepository;

    @Override
    public boolean isValid(PatientRequest value, ConstraintValidatorContext context) {
        if (value == null) {
            return false;
        }

        // Fetch patient from repository using all identifying information
        Optional<Patient> patient = patientRepository.findByFirstNameAndLastNameAndBirthday(
                value.getFirstName(), value.getLastName(), value.getBirthday());

        // If no patient found, consider it valid
        if (patient.isEmpty()) {
            return true;
        }

        Patient existingPatient = patient.get();

        // existing patient information string
        String existingPatientString = existingPatient.getFirstName() + existingPatient.getLastName() +
                existingPatient.getBirthday() + existingPatient.getPhone();

        // new patient information string
        String newPatientString = value.getFirstName() + value.getLastName() +
                value.getBirthday() + value.getPhone();

        // Compare patient information
        return existingPatientString.equals(newPatientString);
    }
}
