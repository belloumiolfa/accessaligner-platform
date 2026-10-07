package access.aligner.backend.Repositories;

import access.aligner.backend.Entities.Teeth;
import access.aligner.backend.Entities.Treatment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;
@Repository
public interface TeethRepository extends JpaRepository<Teeth, Long > {
    Set<Teeth> findByTreatment(Treatment treatment);
}
