import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { BehaviorSubject } from "rxjs";

import { NgxSpinnerService } from "ngx-spinner";
import { HandleAlertsService } from "../../Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../Helpers/handle-errors.service";
import { AppService } from "../app.service";
import { Router } from "@angular/router";
import { PatientRequestsService } from "../../Requests/Patient/patient-requests.service";
import { StepsService } from "../../Helpers/Steps/steps.service";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class PatientService {
  apiBaseUrl = environment.apiBaseUrl;

  constructor(
    private spinner: NgxSpinnerService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private router: Router,
    private patientRequests: PatientRequestsService,
    private appService: AppService,
    private stepsService: StepsService,
    private translate: TranslateService
  ) {}
  private result$ = new BehaviorSubject({});

  getResult$ = this.result$.asObservable();

  setResult(result: any) {
    this.result$.next(result);
  }

  AddPatient(patientData: any, idUser: any) {
    this.spinner.show();
    this.patientRequests.addPatient(patientData, idUser).subscribe(
      (data) => {
        this.handleAlerts.handleSweetAlert(
          this.translate.instant(
            "alert-msg.patient-service.success-add-patient"
          ),
          "success",
          false
        );

        if (this.router.url === "/patients/new-patient") {
          this.router.navigate(["/patients"]);
        } else if (
          this.router.url === "/treatment/new-treatment/null/patient"
        ) {
          this.router.navigate([
            "/treatment/new-treatment/ " + data[0].id + "/general",
          ]);
        }
        this.stepsService.markCurrentStep(1);
        this.stepsService.setDisabledSteps(false);
        this.appService.setPatients$(data);
        this.appService.setPatient$(data[0]);
        this.spinner.hide();
      },
      (err) => {
        this.handleErrors.handleError(err);
        this.spinner.hide();
        this.handleAlerts.handleSweetAlert(
          this.translate.instant(
            "alert-msg.patient-service.failed-add-patient"
          ),
          "error",
          false
        );
      }
    );
  }

  GetPatients() {
    this.spinner.show();
    this.patientRequests.getPatients().subscribe(
      (data) => {
        this.appService.setPatients$(data);
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        this.handleErrors.handleError(err);
      }
    );
  }

  GetPatient(id: any) {
    this.spinner.show();

    this.patientRequests.getPatient(id).subscribe(
      (data) => {
        this.spinner.hide();
        this.appService.setPatient$(data);
        this.setResult(true);
      },
      (err) => {
        this.spinner.hide();
        this.handleErrors.handleError(err);
        this.setResult(false);
      }
    );

    return this.getResult$;
  }

  UpdatePatient(patientData: any, id: any, patients$: any) {
    this.spinner.show();

    this.patientRequests.updatePatient(patientData, id).subscribe(
      (data) => {
        this.spinner.hide();
        this.appService.setPatient$(data);
        this.appService.setPatients$(patients$);
        this.handleAlerts.handleSweetAlert(
          this.translate.instant(
            "alert-msg.patient-service.success-update-patient"
          ),
          "success",
          false
        );
      },
      (err) => {
        this.handleErrors.handleError(err);
        this.spinner.hide();
        this.handleAlerts.handleSweetAlert(
          this.translate.instant(
            "alert-msg.patient-service.failed-update-patient"
          ),
          "error",
          false
        );
      }
    );
  }

  DeletePatient(id: any) {
    this.spinner.show();

    this.patientRequests.deletePatient(id).subscribe(
      (data) => {
        this.appService.setPatients$(data);
        this.spinner.hide();
        this.handleAlerts.handleSweetAlert(
          this.translate.instant(
            "alert-msg.patient-service.success-delete-patient"
          ),
          "success",
          false
        );
      },
      (err) => {
        this.handleErrors.handleError(err);
        this.spinner.hide();

        this.handleAlerts.handleSweetAlert(
          this.translate.instant(
            "alert-msg.patient-service.failed-delete-patient"
          ),
          "error",
          false
        );
      }
    );
  }

  GetPatientsByIdDoctor(id: any) {
    this.spinner.show();
    this.patientRequests.getPatientsByIdDoctor(id).subscribe(
      (data) => {
        this.appService.setPatientsByDoctor$(data);
        this.spinner.hide();
      },
      (err) => {
        this.handleErrors.handleError(err);
        this.spinner.hide();
      }
    );
  }
}
