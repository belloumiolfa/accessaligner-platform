package access.aligner.backend.Entities;

import access.aligner.backend.Enum.Enum_Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "status_id")
    private Long id ;

    @Enumerated(EnumType.STRING)
    private Enum_Status name;

    @OneToMany(mappedBy = "status")
    private Set<UserStatus> userStatus=new HashSet<>();

    private String description;

}
