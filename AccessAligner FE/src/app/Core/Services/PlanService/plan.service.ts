import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";

import { NgxSpinnerService } from "ngx-spinner";
import { HandleAlertsService } from "../../Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../Helpers/handle-errors.service";
import { AppService } from "../app.service";
import { PlanRequestsService } from "../../Requests/Plan/plan-requests.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class PlanService {
  apiBaseUrl = environment.apiBaseUrl;

  constructor(
    private spinner: NgxSpinnerService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private router: Router,
    private planRequests: PlanRequestsService,
    private appService: AppService,
    private translate: TranslateService
  ) {}

  /* BEGINN NEW VERSIONN  */
  savedPlan!: any;
  AddPlan(planData: any, treatment$: any) {
    this.spinner.show();
    this.planRequests
      .addPlan(planData.treatId, planData.description, planData.code)
      .subscribe(
        (data) => {
          this.planRequests
            .addPlanFiles(planData.photos, data.id, "resultPhotos")
            .subscribe(
              (data) => {
                this.planRequests
                  .addPlanFiles(planData.reports, data.id, "resultReports")
                  .subscribe(
                    (data) => {
                      this.planRequests
                        .addPlanFiles(planData.videos, data.id, "resultVideos")
                        .subscribe(
                          (data) => {
                            this.savedPlan = { ...this.savedPlan, ...data };
                            this.appService.setTreatment({
                              ...treatment$,
                              plans: [...treatment$.plans, this.savedPlan],
                            });
                            this.handleAlerts.handleSweetAlert(
                              this.translate.instant(
                                "alert-msg.plan-service.success-add-files"
                              ),
                              "success",
                              false
                            );

                            this.router.navigate([
                              "/treatment/" + planData.treatId,
                            ]);
                          },
                          (err) => {
                            console.log(err);

                            this.spinner.hide();
                            this.handleErrors.handleError(err);

                            this.handleAlerts.handleSweetAlert(
                              this.translate.instant(
                                "alert-msg.plan-service.failed-add-files"
                              ),
                              "error",
                              false
                            );
                          }
                        );
                    },
                    (err) => {
                      console.log(err);

                      this.spinner.hide();
                      this.handleErrors.handleError(err);

                      this.handleAlerts.handleSweetAlert(
                        this.translate.instant(
                          "alert-msg.plan-service.failed-add-files"
                        ),
                        "error",
                        false
                      );
                    }
                  );
              },
              (err) => {
                console.log(err);

                this.spinner.hide();
                this.handleErrors.handleError(err);

                this.handleAlerts.handleSweetAlert(
                  this.translate.instant(
                    "alert-msg.plan-service.failed-add-files"
                  ),
                  "error",
                  false
                );
              }
            );
        },
        (err) => {
          console.log(err);

          this.spinner.hide();
          this.handleErrors.handleError(err);

          this.handleAlerts.handleSweetAlert(
            this.translate.instant("alert-msg.plan-service.failed-add-plan"),
            "error",
            false
          );
        }
      );
  }

  DeletePlan(planId: any, treatment$: any) {
    this.handleAlerts.handleConfirmAlert().then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();

        this.planRequests.deletePlan(planId).subscribe(
          (data) => {
            this.appService.setTreatment({
              ...treatment$,
              plans: [...treatment$.plans.filter((p: any) => p.id !== planId)],
            });

            this.spinner.hide();
            this.handleAlerts.handleSweetAlert(
              this.translate.instant(
                "alert-msg.plan-service.success-delete-plan"
              ),
              "success",
              false
            );
          },
          (err) => {
            console.log("ccc");
            console.log(err);
            this.spinner.hide();
            this.handleErrors.handleError(err);

            this.handleAlerts.handleSweetAlert(
              this.translate.instant(
                "alert-msg.plan-service.failed-delete-plan"
              ),
              "error",
              false
            );
          }
        );
      }
    });
  }

  updateTreatmentPlan(data: any, treatment: any) {
    this.appService.setPlan$(data);
    this.appService.setTreatment({
      ...treatment,
      plans: [...treatment.plans.filter((p: any) => p.id !== data.id), data],
    });

    this.spinner.hide();
  }

  UpdateStatus(planId: any, status: any, feedBack: any, treatment: any) {
    this.spinner.show();

    this.planRequests.updateStatus(planId, status).subscribe(
      (data) => {
        this.updateTreatmentPlan(data, treatment);

        if (!!feedBack) {
          this.spinner.show();

          this.planRequests.updateFeedBack(planId, feedBack).subscribe(
            (data) => {
              this.spinner.hide();

              this.updateTreatmentPlan(data, treatment);
              this.handleAlerts.handleSweetAlert(
                this.translate.instant(
                  "alert-msg.plan-service.success-update-feedback"
                ),
                "success",
                false
              );
            },
            (err) => {
              console.log(err);
              this.spinner.hide();
              this.handleErrors.handleError(err);

              this.handleAlerts.handleSweetAlert(
                this.translate.instant(
                  "alert-msg.plan-service.failed-update-feedback"
                ),
                "error",
                false
              );
            }
          );
        }
        this.appService.setPlan$(data);

        this.spinner.hide();
        this.handleAlerts.handleSweetAlert(
          this.translate.instant(
            "alert-msg.plan-service.success-update-status"
          ),

          "success",
          false
        );
      },
      (err) => {
        console.log(err);

        this.spinner.hide();
        this.handleErrors.handleError(err);

        this.handleAlerts.handleSweetAlert(
          this.translate.instant("alert-msg.plan-service.failed-update-status"),
          "error",
          false
        );
      }
    );
  }

  UpdateStatusGetPlans(planId: any, status: any, treatment$: any) {
    this.spinner.show();
    this.handleAlerts.handleConfirmAlert().then((result) => {
      if (result.isConfirmed) {
        this.planRequests.updateStatus(planId, status).subscribe(
          (data) => {
            this.appService.setTreatment({
              ...treatment$,
              plans: [
                ...treatment$.plans.filter((p: any) => p.id !== data.id),
                data,
              ],
            });
            this.handleAlerts.handleSweetAlert(
              this.translate.instant(
                "alert-msg.plan-service.success-update-status"
              ),
              "success",
              false
            );
            this.spinner.hide();
          },
          (err) => {
            console.log(err);

            this.spinner.hide();
            this.handleErrors.handleError(err);

            this.handleAlerts.handleSweetAlert(
              this.translate.instant(
                "alert-msg.plan-service.failed-update-status"
              ),

              "error",
              false
            );
          }
        );
      }
    });
  }

  UpdateDateDelivery(
    date: any,
    feedBack: any,
    planId: any,
    status: any,
    treatment: any
  ) {
    this.handleAlerts
      .handleConfirmAlert()

      .then((result) => {
        if (result.isConfirmed) {
          this.planRequests.updateDateDelevery(planId, date).subscribe(
            (data) => {
              this.UpdateStatus(planId, status, feedBack, treatment);
            },
            (err) => {
              console.log(err);

              this.spinner.hide();
              this.handleErrors.handleError(err);

              this.handleAlerts.handleSweetAlert(
                this.translate.instant(
                  "alert-msg.plan-service.failed-update-status"
                ),

                "error",
                false
              );
            }
          );
        }
      });
  }

  UpdateProductionDelay(
    feedBack: any,
    productionValue: any,
    planId: any,
    treatment: any
  ) {
    this.handleAlerts.handleConfirmAlert().then((result) => {
      if (result.isConfirmed) {
        this.planRequests
          .updateProductionDelay(planId, productionValue)
          .subscribe(
            (data) => {
              this.UpdateStatus(planId, "PRODUCTION", feedBack, treatment);
            },
            (err) => {
              console.log(err);

              this.spinner.hide();
              this.handleErrors.handleError(err);

              this.handleAlerts.handleSweetAlert(
                this.translate.instant(
                  "alert-msg.plan-service.failed-update-status"
                ),

                "error",
                false
              );
            }
          );
      }
    });
  }

  GetReports(repports: any[], treatId: Number, planId: Number): any[] {
    let repportsWithURL: any[] = [];

    repports?.forEach((element: any) => {
      this.planRequests.getRepports(element.id, treatId, planId).subscribe(
        (data) => {
          element = { ...element, blob: data };
          repportsWithURL.push(element);
        },
        (err) => {
          console.log(err);

          this.spinner.hide();
          this.handleErrors.handleError(err);

          this.handleAlerts.handleSweetAlert(
            this.translate.instant(
              "alert-msg.plan-service.failed-update-status"
            ),

            "error",
            false
          );
        }
      );
    });

    return repportsWithURL;
  }
}
