package access.aligner.backend.Repositories;

import access.aligner.backend.Entities.Doctor;
import access.aligner.backend.Entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.Date;
import java.util.Optional;

public interface PatientRepository  extends JpaRepository<Patient, Long> {
    Optional<Patient> findByFirstName(String firstName);
    Collection<Patient> findByDoctor(Doctor doctor);
    Optional<Patient> findByFirstNameAndLastNameAndBirthday(String firstName, String lastName, Date birthday);
}
