package access.aligner.backend.Repositories;

import access.aligner.backend.Entities.Message;
import access.aligner.backend.Entities.Treatment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message,Long   > {
    List<Message> findByTreatment(Treatment treatment);

    void deleteByTreatment(Treatment treatment);
}
