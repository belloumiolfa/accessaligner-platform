import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, first, map } from "rxjs";
import { loggedInUser } from "../../Helpers/utils";

import { NgxSpinnerService } from "ngx-spinner";
import { HandleAlertsService } from "../../Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../Helpers/handle-errors.service";
import { AppService } from "../app.service";
import { UserRequestsService } from "../../Requests/User/user-requests.service";
import { signInUser } from "../../../Core/Helpers/utils";
import { DomSanitizer } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
@Injectable({
  providedIn: "root",
})
export class UserService {
  apiBaseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private userRequests: UserRequestsService,
    private appService: AppService,
    private sanitizer: DomSanitizer,
    private translate: TranslateService
  ) {}

  getPhoto(id: any, type: any): Observable<any> {
    return this.http
      .get(
        this.apiBaseUrl +
          "/api/private/profile/getPhoto?id=" +
          id +
          "&type=" +
          type,
        {
          responseType: "blob",
          headers: new HttpHeaders().set(
            "Authorization",
            `Bearer ${loggedInUser()}`
          ),
        }
      )
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getDoctors(): Observable<any> {
    return this.http
      .get<any>(`${this.apiBaseUrl}/api/private/get-doctors`, {
        headers: new HttpHeaders().set(
          "Authorization",
          `Bearer ${loggedInUser()}`
        ),
      })
      .pipe(map((data: any) => data));
  }

  UpdateSettings(securityForm: any) {
    this.spinner.show();
    this.userRequests
      .updateSetting(
        securityForm.userName,
        securityForm.currentPassword,
        securityForm.newPassword
      )
      .pipe(first())
      .subscribe(
        (data) => {
          signInUser(data.accessToken, false);
          this.spinner.hide();

          this.handleAlerts.handleSweetAlert(
            this.translate.instant(
              "alert-msg.user-service.success-update-settings"
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
              "alert-msg.user-service.failed-update-settings"
            ),
            "error",
            false
          );
        }
      );
  }

  UpdateProfile(profileForm: any, user$: any) {
    this.spinner.show();
    this.userRequests.updateProfile(profileForm, user$.id).subscribe(
      (data) => {
        this.appService.setUser$({ ...user$, profile: data });

        this.spinner.hide();
        this.handleAlerts.handleSweetAlert(
          this.translate.instant(
            "alert-msg.user-service.success-update-profile"
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
            "alert-msg.user-service.failed-update-profile"
          ),
          "error",
          false
        );
      }
    );
  }

  UpdatePhoto(selectedFile: any, idUser: any) {
    this.spinner.show();

    this.userRequests.updatePhoto(selectedFile, idUser).subscribe(
      (data) => {
        this.appService.setPhoto$(data.id);
        this.spinner.hide();

        this.handleAlerts.handleSweetAlert(
          this.translate.instant("alert-msg.user-service.success-update-photo"),
          "success",
          false
        );
      },
      (err) => {
        this.spinner.hide();
        this.handleErrors.handleError(err);
        this.handleAlerts.handleSweetAlert(
          this.translate.instant("alert-msg.user-service.failed-update-photo"),
          "error",
          false
        );
      }
    );
  }

  safeUrlToString(safeUrl: any): string {
    return (
      safeUrl["changingThisBreaksApplicationSecurity"] ||
      (safeUrl as any).changingThisBreaksApplicationSecurity
    );
  }

  GetPhoto(id: any, photoMap: any, soloPhoto: boolean) {
    this.spinner.show();

    this.userRequests.getPhoto(id, "Profile").subscribe(
      (data: any) => {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          const imageUrl = this.sanitizer.bypassSecurityTrustUrl(
            URL.createObjectURL(data)
          ) as string;

          if (soloPhoto) {
            photoMap = imageUrl;
          } else {
            photoMap.push({
              id: id,
              imageUrl: this.safeUrlToString(imageUrl),
            });
          }
        };
        reader.readAsDataURL(data);

        this.spinner.hide();
      },
      (err: any) => {
        this.handleErrors.handleError(err);
        this.spinner.hide();

        this.handleAlerts.handleSweetAlert(
          this.translate.instant("alert-msg.user-service.failed-get-photo"),
          "error",
          false
        );
      }
    );
    return photoMap;
  }
  UpdateUserStatus() {}
}
