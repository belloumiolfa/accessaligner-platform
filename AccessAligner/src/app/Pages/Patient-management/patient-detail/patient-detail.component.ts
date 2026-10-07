import { Component } from '@angular/core';
import { PatientInfosComponent } from '../../../Components/Patient/patient-infos/patient-infos.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HandleErrorsService } from '../../../Core/Helpers/handle-errors.service';
import { PatientService } from '../../../Core/Services/PatientService/patient.service';
import { AppService } from '../../../Core/Services/app.service';

import { TreatmentListComponent } from '../../Treatment-management/treatment-list/treatment-list.component';
import { CommonModule } from '@angular/common';
import { UtilsService } from '../../../Auth/Helpers/utils.service';
import { TreatmentRequestsService } from '../../../Core/Requests/Treatment/treatment-requests.service';

@Component({
  selector: 'app-patient-detail',
  standalone: true,
  imports: [
    CommonModule,
    PatientInfosComponent,
    RouterModule,
    TreatmentListComponent,
  ],
  templateUrl: './patient-detail.component.html',
  styleUrl: './patient-detail.component.css',
})
export class PatientDetailComponent {
  id!: any;
  errors!: any;
  patient$!: any;
  treatments$!: any;
  user$!: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private patientService: PatientService,
    private spinner: NgxSpinnerService,
    private handleErrors: HandleErrorsService,
    private appService: AppService,
    private treatmentRequests: TreatmentRequestsService,
    public utils: UtilsService
  ) {
    this.activeRoute.params.subscribe((params) => (this.id = params['id']));
    this.appService.getPatient$.subscribe((data) => (this.patient$ = data));
    this.appService.getUser$.subscribe((data) => (this.user$ = data));

    this.treatmentRequests.getTreatmentsByPatientId(Number(this.id)).subscribe(
      (data) => {
        this.appService.setTreatmentsByPatient$(data);

        this.appService.getTreatsByPatient$.subscribe(
          (data) => (this.treatments$ = data)
        );
      },
      (err) => {
        console.log(err);

        this.spinner.hide();
        this.errors = this.handleErrors.handleError(err);
      }
    );
  }
  ngOnInit(): void {
    this.patientService.GetPatient(Number(this.id));
  }

  // Check if there is no current treatment available
  readyToAddNewTreatment(treatments: any) {
    for (let index = 0; index < treatments?.length; index++) {
      const element = treatments[index];
      console.log(element.status);

      if (
        element.status !== 'FINISHED' &&
        element.status !== 'CANCELLED' &&
        element.status !== 'UNQUALIFIED'
      ) {
        return false;
      }
    }
    return true;
  }
}
