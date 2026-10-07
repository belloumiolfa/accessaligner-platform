package access.aligner.backend.Entities;

import access.aligner.backend.Entities.Keys.TreatTeamKey;
import access.aligner.backend.Entities.Keys.UserStatusKey;
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

public class TreatmentTeam {
    @EmbeddedId
    @Column(name = "treat_team_id")
    private TreatTeamKey id ;

    private Date createdAt;



    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name ="responsible")
    private Admin responsible;



    @ManyToOne
    @MapsId("treatmentId")
    @JoinColumn(name ="project")
    private Treatment project;



    @PrePersist
    void defaultValues (){
        this.createdAt= new Date ();
    }

 }
