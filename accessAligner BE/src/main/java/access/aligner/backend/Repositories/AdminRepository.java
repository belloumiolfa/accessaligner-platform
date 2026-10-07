package access.aligner.backend.Repositories;

import access.aligner.backend.Entities.Admin;
import access.aligner.backend.Entities.Treatment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface AdminRepository extends JpaRepository<Admin,Long > {
    Optional<Admin> findByEmail(String email);
}
