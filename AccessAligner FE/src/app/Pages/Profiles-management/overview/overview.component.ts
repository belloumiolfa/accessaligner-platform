import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { AppService } from "../../../Core/Services/app.service";
import { User } from "../../../Core/Models/user.models";
import { TreatmentListComponent } from "../../Treatment-management/treatment-list/treatment-list.component";
import { UtilsService } from "../../../Auth/Helpers/utils.service";
import { AuthRequestsService } from "../../../Core/Requests/Auth/auth-requests.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-overview",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TreatmentListComponent,
    TranslateModule,
    RouterModule,
  ],
  templateUrl: "./overview.component.html",
  styleUrl: "./overview.component.css",
})
export class OverviewComponent {
  viewProfile: boolean = false;
  user$!: User;
  count = {
    countTo: 100,
    from: 0,
    duration: 1,
  };
  myPatients$: any = [];
  numberOfPatients: any;

  myTreatments$: any = [];
  numberOfTreatments: any;

  nbrFinishedTreat: any;
  nbrInProgressTreat: any;
  id: any;
  constructor(
    private appService: AppService,
    public utilsService: UtilsService,
    private activeRoute: ActivatedRoute,
    private authRequests: AuthRequestsService
  ) {
    this.activeRoute.queryParams.subscribe((params) => {
      if (params["viewProfile"]) {
        this.viewProfile = true;

        this.activeRoute.parent?.params.subscribe((params) => {
          this.id = params["id"];
          this.authRequests.getUserById(this.id).subscribe((data) => {
            this.user$ = data;
            this.getPatients();
            this.getTreatments();
          });
        });
      } else {
        this.viewProfile = false;
        this.appService.getUser$.subscribe((data) => {
          this.user$ = data;

          this.getPatients();
          this.getTreatments();
        });
      }
    });
  }

  getPatients() {
    this.appService.getPatientsByDoctors$.subscribe((data) => {
      this.myPatients$ = data;

      this.numberOfPatients = this.myPatients$.length;
    });
  }

  getTreatments() {
    this.appService.getTreatByDoctors$.subscribe((data) => {
      this.myTreatments$ = data;
      this.numberOfTreatments = this.myTreatments$.length;

      this.nbrFinishedTreat = this.myTreatments$.filter(
        (treat: { status: string }) => treat.status === "FINISHED"
      ).length;

      this.nbrInProgressTreat = this.myTreatments$.filter(
        (treat: { status: string }) => treat.status === "INPROGRESS"
      ).length;
    });
  }
}
