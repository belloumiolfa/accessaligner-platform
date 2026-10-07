import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { AppService } from "../../../Core/Services/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { HandleErrorsService } from "../../../Core/Helpers/handle-errors.service";
import { TreatmentHeaderComponent } from "../../../Components/Treatment/treatment-header/treatment-header.component";
import { ActivitiesComponent } from "../../../Components/Treatment/activities/activities.component";
import { InfosComponent } from "../../../Components/Treatment/infos/infos.component";
import { TeethComponent } from "../../../Components/Treatment/teeth/teeth.component";
import { PhotographsComponent } from "../../../Components/Treatment/photographs/photographs.component";
import { ClinicsComponent } from "../../../Components/Treatment/clinics/clinics.component";
import { QuoteReportComponent } from "../../../Components/Treatment/quote-report/quote-report.component";
import { TreatmentConfirmationComponent } from "../../../Components/Treatment/treatment-confirmation/treatment-confirmation.component";
import { TreatmentStatusComponent } from "../../../Components/Treatment/treatment-status/treatment-status.component";
import { PatientTreatTeethInformationsComponent } from "../../../Components/Timeline New Treatment/patient-treat-teeth-informations/patient-treat-teeth-informations.component";
import { ConfirmationComponent } from "../../../Auth/confirmation/confirmation.component";
import { TreatmentRequestsService } from "../../../Core/Requests/Treatment/treatment-requests.service";
import { ModalService } from "../../../Core/Helpers/modal.service";

@Component({
  selector: "app-treatment-details",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TreatmentHeaderComponent,
    ActivitiesComponent,
    InfosComponent,
    TeethComponent,
    PhotographsComponent,
    ClinicsComponent,
    QuoteReportComponent,
    TreatmentConfirmationComponent,
    TreatmentStatusComponent,
    PatientTreatTeethInformationsComponent,
    ConfirmationComponent,
    PatientTreatTeethInformationsComponent,
  ],
  templateUrl: "./treatment-details.component.html",
  styleUrl: "./treatment-details.component.css",
})
export class TreatmentDetailsComponent {
  selectedFiles: any;
  id: any;
  errors: any;
  treatment$!: any;
  messages!: any;
  user$!: any;
  notSeenMsgCount!: number;

  constructor(
    private treatmentRequests: TreatmentRequestsService,
    private modalService: ModalService,
    private appService: AppService,
    private activeRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private handleErrors: HandleErrorsService
  ) {
    this.activeRoute.params.subscribe((params) => {
      this.id = params["id"];

      this.treatmentRequests.getTreatmentById(Number(this.id)).subscribe(
        (data) => {
          this.spinner.hide();
          this.appService.setTreatment(data);
          this.treatment$ = data;

          // set photos
          this.appService.setTreatPhotos(this.treatment$?.photos);
          // set clinics
          this.appService.setTreatClinics(this.treatment$?.clinics);
        },
        (err) => {
          this.spinner.hide();
          this.errors = this.handleErrors.handleError(err);
        }
      );
    });
    this.appService.getUser$.subscribe((data) => {
      this.user$ = data;
    });
    // count how much messages not seen by current user
    this.appService.getMesssages$.subscribe((data) => {
      this.messages = data;

      for (let index = 0; index < this.messages.length; index++) {
        const element = this.messages[index];
        if (!this.isSeenByCurrentUser(element)) {
          this.notSeenMsgCount += 1;
        }
      }
      console.log(this.notSeenMsgCount);
    });
  }
  isSeenByCurrentUser(message: any): boolean {
    // Check if the current user is in the seenBy array
    return message.seenBy.some(
      (user: { id: any }) => user.id === this.user$.id
    );
  }

  ngOnDestroy(): void {
    this.appService.setTreatment({});
  }
  openModal(data: any) {
    this.modalService.openChatModal(data);
  }
}
