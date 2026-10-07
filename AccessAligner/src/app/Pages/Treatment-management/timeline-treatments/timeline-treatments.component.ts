import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { PatientTreatClinicsInformationsComponent } from "../../../Components/Timeline New Treatment/patient-treat-clinics-informations/patient-treat-clinics-informations.component";
import { PatientTreatInformationsComponent } from "../../../Components/Timeline New Treatment/patient-treat-informations/patient-treat-informations.component";
import { PatientTreatPhotosInformationsComponent } from "../../../Components/Timeline New Treatment/patient-treat-photos-informations/patient-treat-photos-informations.component";
import { PatientTreatTeethInformationsComponent } from "../../../Components/Timeline New Treatment/patient-treat-teeth-informations/patient-treat-teeth-informations.component";
import { PatientDisplayInformationsComponent } from "../../../Components/Patient/patient-display-informations/patient-display-informations.component";

@Component({
  selector: "app-timeline-treatments",
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    PatientDisplayInformationsComponent,
    PatientTreatInformationsComponent,
    PatientTreatTeethInformationsComponent,
    PatientTreatPhotosInformationsComponent,
    PatientTreatClinicsInformationsComponent,
    RouterModule,
  ],
  templateUrl: "./timeline-treatments.component.html",
  styleUrl: "./timeline-treatments.component.css",
})
export class TimelineTreatmentsComponent {
  @Input() treatment: any;
}
