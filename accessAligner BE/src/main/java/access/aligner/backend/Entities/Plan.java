package access.aligner.backend.Entities;

import access.aligner.backend.Enum.Enum_Status;
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

public class Plan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;

    private Enum_Status status;
    private Date deleveryDate ;
    private String comment;
    private String feedBack;
    private String code;
    private Long productionDays;
    private Date createdAt;
    private Date updatedAt;

    @OneToMany(mappedBy = "plan")
    private Set<File> reports ;

    @ManyToOne
    @JoinColumn(name = "treatment")
    private Treatment treatment;



    @PrePersist
    void defaultValues (){
        this.createdAt= new Date ();
        this.updatedAt=new Date();
    }

}
