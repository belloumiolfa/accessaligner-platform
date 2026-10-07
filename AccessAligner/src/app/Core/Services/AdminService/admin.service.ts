import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { HandleAlertsService } from '../../Helpers/handle-alerts.service';
import { HandleErrorsService } from '../../Helpers/handle-errors.service';
import { AdminRequestsService } from '../../Requests/Admin/admin-requests.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthRequestsService } from '../../Requests/Auth/auth-requests.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  result$ = new BehaviorSubject([]);
  getResult$ = this.result$.asObservable();
  errors: any;

  constructor(
    private spinner: NgxSpinnerService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private translate: TranslateService,
    private authRequests: AuthRequestsService,
    private adminRequests: AdminRequestsService,
    private router: Router,
  ) {}

  setResult(result: any) {
    this.result$.next(result);
  }

  /******************************************************************************** */

  approveUser(userId: number): void {
    this.handleErrors.handleError({});
    this.spinner.show();

    this.adminRequests.approveUser(userId).subscribe(
      () => {
        this.spinner.hide();

        const title = this.translate.instant(
          'alert-msg.auth-service.accepted-msg',
        );

        this.handleAlerts.handleSweetAlert(title, 'success', false);

        /*         
        // Reload users or navigate
        this.getUsers();
        */
      },

      (err: any) => {
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
  rejectUser(userId: number, reason: string): void {
    this.handleErrors.handleError({});
    this.spinner.show();

    this.adminRequests.rejectUser(userId, reason).subscribe({
      next: () => {
        this.spinner.hide();

        const title = this.translate.instant(
          'alert-msg.auth-service.rejected-msg',
        );

        this.handleAlerts.handleSweetAlert(title, 'success', false);

        // this.getUsers();
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
    });
  }
  /******************************************************************************** */
  NewAdmin(data: any) {
    this.spinner.show();
    this.adminRequests.newAdmin(data).subscribe(
      (data) => {
        this.spinner.hide();
        this.handleAlerts.handleSweetAlert(data.message, 'success', false);
      },
      (err) => {
        console.log();
        this.handleErrors.handleError(err);
        this.spinner.hide();
        this.handleAlerts.handleSweetAlert(
          this.translate.instant('alert-msg.admin-service.failed-msg'),
          'error',
          false,
        );
      },
    );
  }

  SwitchToSuperAdmin(index: any, target: any) {
    this.spinner.show();
    this.adminRequests.switchToSuperAdmin(index, target).subscribe(
      (data) => {
        this.spinner.hide();
        this.handleAlerts.handleSweetAlert(
          this.translate.instant('alert-msg.admin-service.success-switch-msg'),
          'success',
          false,
        );
        this.GetAdmins();
      },
      (err) => {
        this.spinner.hide();
        this.handleErrors.handleError(err);
        this.handleAlerts.handleSweetAlert(
          this.translate.instant('alert-msg.admin-service.failed-msg'),
          'error',
          false,
        );
      },
    );
  }

  GetAdmins() {
    this.spinner.show();
    this.adminRequests.getAdmins().subscribe(
      (data) => {
        console.log(data);

        this.spinner.hide();
        this.setResult(data);
      },
      (err) => {
        this.spinner.hide();
        this.handleErrors.handleError(err);
        this.handleAlerts.handleSweetAlert(
          this.translate.instant('alert-msg.admin-service.failed-msg'),
          'error',
          false,
        );
      },
    );
  }

  DeleteAdmin(id: any) {
    this.handleAlerts.handleConfirmAlert().then((result) => {
      if (result.isConfirmed) {
        this.adminRequests.deleteAdmin(id).subscribe(
          (data) => {
            this.spinner.hide();

            this.handleAlerts.handleSweetAlert(data.message, 'success', false);
            this.GetAdmins();
          },
          (err) => {
            this.spinner.hide();
            this.handleErrors.handleError(err);

            this.handleAlerts.handleSweetAlert(
              this.translate.instant('alert-msg.admin-service.failed-msg'),
              'error',
              false,
            );
          },
        );
      }
    });
  }
}
