package access.aligner.backend.Repositories;

import access.aligner.backend.Entities.Plan;
import access.aligner.backend.Entities.Treatment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Set;

public interface PlanRepository extends JpaRepository<Plan, Long> {
    Set<Plan> findByTreatment(Treatment treatment);
    @Query(value = """
                SELECT MONTH(p.created_at) AS month, COUNT(p.plan_id) AS plan_count
                   FROM accessaligner.plan p 
                   WHERE YEAR(p.created_at) = :year
                   GROUP BY MONTH(p.created_at)
                   ORDER BY month;
            """, nativeQuery = true)
    List<Object[]> findPlanStatisticsByYear(int year);

}
