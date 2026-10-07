import { CommonModule } from "@angular/common";
import { Component, Input, SimpleChanges } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { Router, RouterModule } from "@angular/router";
import { NgCircleProgressModule } from "ng-circle-progress";
import { NgxSpinnerService } from "ngx-spinner";
import Swal from "sweetalert2";
import { HandleAlertsService } from "../../../Core/Helpers/handle-alerts.service";
import { SearchService } from "../../../Core/Helpers/search.service";
import { StatusClassService } from "../../../Core/Helpers/status-class.service";
import { AppService } from "../../../Core/Services/app.service";
import { AuthService } from "../../../Core/Services/AuthService/auth.service";
import { UserService } from "../../../Core/Services/UserService/user.service";
import { HandleErrorsService } from "../../../Core/Helpers/handle-errors.service";
import { AuthRequestsService } from "../../../Core/Requests/Auth/auth-requests.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-grid-users",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgCircleProgressModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: "./grid-users.component.html",
  styleUrl: "./grid-users.component.css",
})
export class GridUsersComponent {
  searchTerm: any;

  errors!: any;
  @Input() doctors$: any[] = [];
  @Input() archive!: boolean;
  photoMap: any[] = []; // Map to store photos by  ID

  filter: boolean = false;
  doctorsAfterFilter: any[] = [];
  user$!: any;
  constructor(
    private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private searchService: SearchService,
    private statusService: StatusClassService,
    private authService: AuthService,
    private appService: AppService,
    private handleAlerts: HandleAlertsService,
    private handleErrors: HandleErrorsService,
    private router: Router,
    private authRequests: AuthRequestsService
  ) {
    this.appService.getUser$.subscribe((data) => (this.user$ = data));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["doctors$"] && changes["doctors$"].currentValue) {
      this.doctors$.forEach((doctor: any) => {
        if (doctor?.profile?.photo !== null)
          this.getProfilePhoto(doctor?.profile?.photo?.id);
      });
    }
  }

  navigateToPorfile(id: any) {
    this.router.navigate(["/profile/" + id + "/overview"], {
      queryParams: { viewProfile: true },
    });
  }

  getProfilePhoto(id: any) {
    if (id) {
      this.photoMap = this.userService.GetPhoto(id, this.photoMap, false);
    }
  }

  safeUrlToString(safeUrl: any): string {
    return (
      safeUrl["changingThisBreaksApplicationSecurity"] ||
      (safeUrl as any).changingThisBreaksApplicationSecurity
    );
  }

  percent = 65;
  options = {
    animate: {
      duration: 0,
      enabled: false,
    },
    barColor: "#2C3E50",
    scaleColor: false,
    lineWidth: 20,
    lineCap: "circle",
  };

  serachByName() {
    if (this.searchTerm.trim() !== "") {
      this.filter = true;

      this.doctorsAfterFilter = this.searchService.searchUser(
        this.searchTerm,
        this.doctors$
      );
    } else {
      this.filter = false;
    }
  }

  getClassStatus(status: any) {
    return this.statusService.getClassStatusUser(status);
  }

  findPhotoById(profile: any) {
    if (profile.photo != null) {
      let id = profile.photo.id;

      return this.photoMap.filter((photo) => photo.id === id)[0]?.imageUrl;
    } else {
      return "/assets/images/profile_av.png";
    }
  }

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

  updateUser(userId: any, status: any) {
    this.authRequests.updateStatus(userId, status, this.user$.id).subscribe(
      (data) => {
        console.log(data);

        this.spinner.hide();
        if (status === "ACCEPTED" && !this.archive)
          this.doctors$ = [
            ...this.doctors$.filter((doctor) => doctor.profile.id !== userId),
            data,
          ];
        else
          this.doctors$ = [
            ...this.doctors$.filter((doctor) => doctor.profile.id !== userId),
          ];
        this.handleAlerts.handleSweetAlert(
          "Le dentiste a réussi" + data.userStatus.status.frenchName + ".",
          "success",
          false
        );
      },
      (err) => {
        console.log(err);

        this.spinner.hide();
        this.handleAlerts.handleSweetAlert(
          "La modification du status de entiste a échoué",
          "error",
          false
        );
      }
    );
  }

  confirmUpdateUser(userId: any, status: any) {
    this.handleAlerts.handleConfirmAlert().then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();

        this.updateUser(userId, status);
      }
    });
  }
}
