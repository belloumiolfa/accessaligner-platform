package access.aligner.backend.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")

    private Long id ;

    private Date start;
    private Date end ;
    private String title;
    private String risk;
    private Date createdAt;

    @ManyToMany(mappedBy = "eventList")
    private Set<User> userList;

}
