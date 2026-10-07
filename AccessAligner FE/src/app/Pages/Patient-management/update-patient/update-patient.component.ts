import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PatientInfosComponent } from "../../../Components/Patient/patient-infos/patient-infos.component";
import { PatientFormComponent } from "../../../Components/Patient/patient-form/patient-form.component";
import { AppService } from "../../../Core/Services/app.service";
import { PatientService } from "../../../Core/Services/PatientService/patient.service";

@Component({
  selector: "app-update-patient",
  standalone: true,
  imports: [PatientInfosComponent, PatientFormComponent],
  templateUrl: "./update-patient.component.html",
  styleUrl: "./update-patient.component.css",
})
export class UpdatePatientComponent {
  id!: number;
  errors: any;
  patient$!: any;
  constructor(
    private activeRoute: ActivatedRoute,
    private patientService: PatientService,
    private appService: AppService
  ) {
    this.appService.getPatient$.subscribe((data) => {
      this.patient$ = data;
      console.log(this.patient$);
    });
  }
  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.id = params["id"];
      this.patientService.GetPatient(this.id);
    });
  }
}
