package access.aligner.backend.Repositories;

import access.aligner.backend.Entities.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface DoctorRepository extends JpaRepository<Doctor, Long> {

 }
