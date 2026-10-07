package access.aligner.backend.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)

public class Doctor extends User{

    @OneToMany(mappedBy = "doctor")
    private Set<Patient> patients;
    public void setPatients(Patient patient) {
        if (patients == null) {
            patients = new HashSet<>();
        }
        this.patients.add(patient);
       // treatment.setDoctor(this);
    }
    public Set<Patient> getPatients(){
        return this.patients;
    }

}
