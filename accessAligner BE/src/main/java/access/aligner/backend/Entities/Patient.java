package access.aligner.backend.Entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patient_id")
    private Long id ;

    private String firstName ;
    private String lastName ;
    private Date birthday;
    private String sex;
    private String email;
    private String phone ;
    private String disease;
    private String address;
    private String comment;
    private Date createdAt;
    private Date updatedAt;
    private int nbrTreat;
    @ManyToOne
    @JoinColumn(name = "doctor")
    private Doctor doctor;

    @OneToMany(mappedBy = "patient")
    private Set<Treatment> treatments ;

    public void setTreatments(Treatment treatment) {
        if (treatments == null) {
            treatments = new HashSet<>();
        }
        this.treatments.add(treatment);
    }

    public Set<Treatment> getTreatments(){
        return this.treatments;
    }

    @PrePersist
    void defaultValues (){
        this.createdAt= new Date ();
        this.updatedAt=new Date();
    }

}
