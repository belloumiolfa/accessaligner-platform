import { Component } from "@angular/core";
import { PatientFormComponent } from "../../../Components/Patient/patient-form/patient-form.component";

@Component({
  selector: "app-add-new-patient",
  standalone: true,
  imports: [PatientFormComponent],
  templateUrl: "./add-new-patient.component.html",
  styleUrl: "./add-new-patient.component.css",
})
export class AddNewPatientComponent {}
