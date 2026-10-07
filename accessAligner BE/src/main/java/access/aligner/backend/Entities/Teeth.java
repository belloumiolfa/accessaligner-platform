package access.aligner.backend.Entities;

import access.aligner.backend.Enum.Enum_Action;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)

public class Teeth {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "teeth_id")
    private Long id ;

    private int num;
    private Enum_Action action;

    @ManyToOne
    private Treatment treatment;

}
