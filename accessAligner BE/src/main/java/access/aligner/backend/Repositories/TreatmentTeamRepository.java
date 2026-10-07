package access.aligner.backend.Repositories;

import access.aligner.backend.Entities.Admin;
import access.aligner.backend.Entities.Keys.TreatTeamKey;
import access.aligner.backend.Entities.Treatment;
import access.aligner.backend.Entities.TreatmentTeam;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface TreatmentTeamRepository extends JpaRepository<TreatmentTeam, TreatTeamKey> {
    void deleteAllByProject(Treatment treatment);
    Set<TreatmentTeam> findByProject(Treatment treatment);
    Set<TreatmentTeam> findByResponsible(Admin admin);
}
