import { Injectable } from '@angular/core';
import { User } from '../../Models/user.models';
import { BehaviorSubject, first } from 'rxjs';
import { logOut, loggedInUser } from '../../Helpers/utils';
import { environment } from '../../../../environments/environment.development';
import { NgxSpinnerService } from 'ngx-spinner';
import { HandleAlertsService } from '../../Helpers/handle-alerts.service';
import { HandleErrorsService } from '../../Helpers/handle-errors.service';
import { AuthRequestsService } from '../../Requests/Auth/auth-requests.service';
import { signInUser } from '../../Helpers/utils';
import { Router } from '@angular/router';
import { SignUpObject } from '../../Models/auth-objects';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../app.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiBaseUrl = environment.apiBaseUrl;
  user: User | null = null;
  errors: any;

  private user$ = new BehaviorSubject({});

  getUser$ = this.user$.asObservable();

  constructor(
    private spinner: NgxSpinnerService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private authRequests: AuthRequestsService,
    private router: Router,
    private translate: TranslateService,
    private appService: AppService,
  ) {}

  public currentUser(): User | null {
    if (!this.user) {
      this.user = loggedInUser();
    }

    return this.user;
  }

  logout(): void {
    this.appService.setTreatments([]);
    this.appService.setTreatmentsByDoctor$([]);
    this.appService.setTreatmentsByPatient$([]);
    this.appService.setUser$({});

    this.user = null;

    logOut();
  }

  setUser$(user: any) {
    this.user$.next(user);
  }

  SignIn(dataUser: User) {
    this.handleErrors.handleError({});
    this.authRequests
      .login(dataUser.email!, dataUser.password!)
      .pipe(first())
      .subscribe(
        (data) => {
          this.spinner.hide();
          signInUser(data.accessToken, dataUser.keepLoggedIn);
          this.router.navigate(['/']);
        },
        (err) => {
          console.log(err);
          this.spinner.hide();
          this.handleErrors.handleError(err);
          this.handleAlerts.handleSweetAlert(
            this.translate.instant('alert-msg.auth-service.sigin-failed-msg'),
            'error',
            false,
          );
        },
      );
  }

  SignUp(data: SignUpObject) {
    this.handleErrors.handleError({});
    this.spinner.show();
    this.authRequests
      .signup(data)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.spinner.hide();
          this.handleAlerts.handleSweetAlert(data.message, 'success', false);
          this.router.navigate(['sign-in']);
        },
        (err) => {
          console.log('errrooor', err);
          this.spinner.hide();
          this.handleAlerts.handleSweetAlert(
            this.translate.instant('alert-msg.auth-service.sigup-failed-msg'),
            'error',
            false,
          );

          this.handleErrors.handleError(err);
        },
      );
  }

  ForgetPassword(email: string) {
    this.spinner.show();
    this.errors = this.handleErrors.handleError({});
    this.authRequests.forgetPassword(email).subscribe(
      (data) => {
        this.spinner.hide();
        this.handleAlerts.handleSweetAlert(data.message, 'success', false);
      },
      (err) => {
        this.spinner.hide();
        this.errors = this.handleErrors.handleError(err);

        this.handleAlerts.handleSweetAlert(
          this.translate.instant(
            'alert-msg.auth-service.forget-password-failed-msg',
          ),

          'error',
          false,
        );
      },
    );
  }

  loadConfirmationInfo(token: string) {
    //this.spinner.show();
    return this.authRequests.getConfirmationInfo(token); /* .subscribe(
      (data) => {
        console.log('loadConfirmationInfo:', data);
        return data;
      },

      (err) => {
        //this.spinner.hide();
        this.handleErrors.handleError(err);

        this.handleAlerts.handleSweetAlert(
          this.errors.status,
          'warning',
          false,
        );
      },
    ); */
  }

  confirmRegistration(token: string) {
    //this.handleErrors.handleError({});
    //this.spinner.show();

    return this.authRequests.confirmRegistration(token).subscribe(
      (data) => {
        this.spinner.hide();

        const title = this.translate.instant(
          'alert-msg.auth-service.confirmed-msg',
        );

        this.handleAlerts.handleSweetAlert(data.message, 'success', false);

        this.router.navigate(['sign-in']);
      },

      (err) => {
        this.spinner.hide();
        this.handleErrors.handleError(err);

        this.handleAlerts.handleSweetAlert(
          this.errors.status, 
          'warning',
          false,
        );
      },
    );
  }
  
  cancelRegistration(token: string) {
    this.handleErrors.handleError({});
    this.spinner.show();

    return this.authRequests.cancelRegistration(token); /* .subscribe({
      next: () => {
        this.spinner.hide();

        const title = this.translate.instant(
          'alert-msg.auth-service.canceled-msg',
        );

        this.handleAlerts.handleSweetAlert(title, 'success', false);

        this.router.navigate(['sign-in']);
      },

      error: (err) => {
        this.spinner.hide();
        this.handleErrors.handleError(err);

        this.handleAlerts.handleSweetAlert(
          this.errors.status,
          'warning',
          false,
        );
      },
    }); */
  }

  /*   UpdateStatus(userId: any, status: any, adminId: any) {
    this.handleErrors.handleError({});
    this.spinner.show();

    if (status === "CONFIRMED" || status === "CANCELED") {
      this.authRequests.updateStatus(userId, status, null).subscribe(
        (data) => {
          this.spinner.hide();
          let title =
            status == "CONFIRMED"
              ? this.translate.instant("alert-msg.auth-service.confirmed-msg")
              : this.translate.instant("alert-msg.auth-service.canceled-msg");

          this.handleAlerts.handleSweetAlert(title, "success", false);
          this.router.navigate(["sign-in"]);
        },
        (err) => {
          this.handleErrors.handleError(err);
          this.spinner.hide();

          this.handleAlerts.handleSweetAlert(
            this.errors.status,
            "warning",
            false
          );
        }
      );
    }
  }
 */
  GetUserById(userId: any) {
    this.spinner.show();
    this.authRequests.getUserById(userId).subscribe(
      (data) => {
        this.spinner.hide();
        this.setUser$(data);
      },
      (err) => {
        this.spinner.hide();
        this.errors = this.handleErrors.handleError(err);
      },
    );

    return this.getUser$;
  }
}
