package access.aligner.backend.Repositories;

import access.aligner.backend.Entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}
