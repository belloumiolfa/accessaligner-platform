package access.aligner.backend.Repositories;

import access.aligner.backend.Entities.Email;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailRepository extends JpaRepository<Email, Long> {
}
