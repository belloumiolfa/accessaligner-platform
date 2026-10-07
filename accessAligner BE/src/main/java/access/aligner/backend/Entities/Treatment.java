package access.aligner.backend.Entities;

import access.aligner.backend.Enum.Enum_Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)

public class Treatment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "treatment_id")
    private Long id ;

    private String antCross;
    private String classI;
    private String crowding;
    private String extract;
    private String gap;
    private String overbite;
    private String treat;
    private String postCross;
    private String reduceOverbite;
    private Enum_Status status;
    private String previousStatus;
    private String description;

    private String teethComment;
    private String photosComment;
    private String clinicsComment;
    private Date createdAt;
    private Date updatedAt;

    @ManyToOne
    @JoinColumn(name = "patient")
    private Patient patient;

    @OneToMany(mappedBy = "treatment")
    private Set<Teeth> teeth;

    @OneToMany(mappedBy = "treatment")
    private Set<File> photos ;



    @OneToMany(mappedBy = "project")
    private Set<TreatmentTeam> team = new HashSet<>();
    public void setTeam(TreatmentTeam admin) {
        if (team == null) {
            team = new HashSet<>();

            this.team.add(admin);
        }
    }
    public Set<TreatmentTeam> getTeam (){
        return this.team;
    }



    @OneToMany(mappedBy = "treatment")
    private Set<Plan> plans ;
    public void setPlan(Plan plan ) {
        if (plans  == null) {
            plans = new HashSet<>();
        }
        this.plans.add(plan);
    }
    public Set<Plan> getPlans (){
        return this.plans;
    }




    @PrePersist
    void defaultValues (){
        this.createdAt= new Date ();
        this.updatedAt=new Date();
    }


}
