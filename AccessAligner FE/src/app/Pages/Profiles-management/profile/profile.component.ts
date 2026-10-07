import { Component } from "@angular/core";
import { AppService } from "../../../Core/Services/app.service";
import { User } from "../../../Core/Models/user.models";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterModule, RouterOutlet } from "@angular/router";
import { NgCircleProgressModule } from "ng-circle-progress";
import { BaseChartDirective } from "ng2-charts";
import { BlockHeaderComponent } from "../../../Shared/Elements/block-header/block-header.component";
import { PatientService } from "../../../Core/Services/PatientService/patient.service";
import { AuthService } from "../../../Core/Services/AuthService/auth.service";
import { ProfileImageComponent } from "../../../Shared/Elements/profile-image/profile-image.component";
import { NgxSpinnerService } from "ngx-spinner";
import { HandleErrorsService } from "../../../Core/Helpers/handle-errors.service";
import { UtilsService } from "../../../Auth/Helpers/utils.service";
import { TreatmentRequestsService } from "../../../Core/Requests/Treatment/treatment-requests.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    NgCircleProgressModule,
    BaseChartDirective,
    BlockHeaderComponent,
    ProfileImageComponent,
    TranslateModule,
  ],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.css",
})
export class ProfileComponent {
  user$!: User;
  profilePhoto$!: any;
  viewProfile: boolean = false;
  clickedIndex = 0;
  totalTreatments: any;
  id!: any;
  errors: any;
  constructor(
    private activeRoute: ActivatedRoute,
    private appService: AppService,
    private patientService: PatientService,
    private treatmentRequests: TreatmentRequestsService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private handleErrors: HandleErrorsService,
    public utilsService: UtilsService
  ) {
    appService.getPhoto$.subscribe((data) => {
      this.profilePhoto$ = data;
    });

    this.activeRoute.queryParams.subscribe((params) => {
      if (params["viewProfile"]) {
        this.viewProfile = true;
      } else {
        this.viewProfile = false;
      }
    });

    this.activeRoute.params.subscribe((params) => {
      this.id = params["id"];

      this.authService.GetUserById(this.id).subscribe((data) => {
        this.user$ = data;

        this.profilePhoto$ = this.user$?.profile?.photo?.id;

        if (utilsService.isDoctor(this.user$)) {
          this.patientService.GetPatientsByIdDoctor(this.user$.id);
          // get doctor treatments
          this.treatmentRequests
            .getTreatmentsByIdDoctor(this.user$.id)
            .subscribe(
              (data) => {
                this.totalTreatments = data.length;
                this.appService.setTreatmentsByDoctor$(data);
                this.spinner.hide();
              },
              (err) => {
                this.errors = this.handleErrors.handleError(err);
                this.spinner.hide();
              }
            );
        }
      });
    });
  }

  chartAreaData = [
    { y: "2006", a: 100, b: 90 },
    { y: "2007", a: 75, b: 65 },
    { y: "2008", a: 50, b: 40 },
    { y: "2009", a: 75, b: 65 },
    { y: "2010", a: 50, b: 40 },
    { y: "2011", a: 75, b: 65 },
    { y: "2012", a: 100, b: 90 },
  ];
  chartAreaOptions = {};

  getPercentUser(profile: any) {
    let totalFields = 0;
    let completedFields = 0;

    for (let key in profile) {
      if (profile.hasOwnProperty(key)) {
        totalFields++;

        if (
          profile[key] !== null &&
          profile[key] !== undefined &&
          profile[key] !== ""
        ) {
          completedFields++;
        }
      }
    }

    // Calculate percentage
    if (totalFields === 0) {
      return 0; // Avoid division by zero
    } else {
      return Math.trunc((completedFields / totalFields) * 100);
    }
  }
}
