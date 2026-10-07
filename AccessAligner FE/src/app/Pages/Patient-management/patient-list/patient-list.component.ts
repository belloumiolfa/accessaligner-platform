import { Component } from "@angular/core";
import { AppService } from "../../../Core/Services/app.service";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { Router, RouterModule } from "@angular/router";
import { PatientService } from "../../../Core/Services/PatientService/patient.service";
import { NgxSpinnerService } from "ngx-spinner";
import { HandleAlertsService } from "../../../Core/Helpers/handle-alerts.service";
import { FormsModule } from "@angular/forms";
import { SearchService } from "../../../Core/Helpers/search.service";
import { ProfileImageComponent } from "../../../Shared/Elements/profile-image/profile-image.component";
import { UtilsService } from "../../../Auth/Helpers/utils.service";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-patient-list",
  standalone: true,
  imports: [
    DataTablesModule,
    CommonModule,
    NgxDatatableModule,
    RouterModule,
    FormsModule,
    ProfileImageComponent,
    TranslateModule,
  ],
  templateUrl: "./patient-list.component.html",
  styleUrl: "./patient-list.component.css",
})
export class PatientListComponent {
  patients$!: any;
  patientsBeforeFilter$!: any;
  filter: boolean = false;
  errors: any;
  searchTerm: string = "";
  user$!: any;

  constructor(
    private patientService: PatientService,
    private handleAlerts: HandleAlertsService,
    private appService: AppService,
    private searchService: SearchService,
    private router: Router,
    public utils: UtilsService
  ) {
    this.appService.getUser$.subscribe((data) => (this.user$ = data));
    this.appService.getPatients$.subscribe((data) => {
      if (utils.isDoctor(this.user$)) {
        this.patients$ = data
          .filter((patient) => patient.doctor?.id === this.user$.id)
          .sort((patientA, patientB) => {
            return (
              new Date(patientB.createdAt).getTime() -
              new Date(patientA.createdAt).getTime()
            );
          });
      } else {
        this.patients$ = data.sort((patientA, patientB) => {
          return (
            new Date(patientB.createdAt).getTime() -
            new Date(patientA.createdAt).getTime()
          );
        });
      }

      this.patientsBeforeFilter$ = this.patients$;
    });
  }
  navigateToPorfile(id: any) {
    this.router.navigate(["/profile/" + id + "/overview"], {
      queryParams: { viewProfile: true },
    });
  }

  deletePatient(id: any) {
    this.handleAlerts.handleConfirmAlert().then((result) => {
      if (result.isConfirmed) {
        this.patientService.DeletePatient(Number(id));
      }
    });
  }

  serachByName() {
    if (this.searchTerm.trim() !== "") {
      this.filter = true;

      this.patients$ = this.searchService.searchPatient(
        this.searchTerm,
        this.patientsBeforeFilter$
      );
    } else {
      this.patients$ = this.patientsBeforeFilter$;
      this.filter = false;
    }
  }
}
