import { Component } from "@angular/core";
import { PatientFormComponent } from "../../Patient/patient-form/patient-form.component";

@Component({
  selector: "app-new-treat-patient",
  standalone: true,
  imports: [PatientFormComponent],
  templateUrl: "./new-treat-patient.component.html",
  styleUrl: "./new-treat-patient.component.css",
})
export class NewTreatPatientComponent {}
