import { Injectable } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { HandleAlertsService } from "../../Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../Helpers/handle-errors.service";
import { Router } from "@angular/router";
import { TreatmentRequestsService } from "../../Requests/Treatment/treatment-requests.service";
import { StepsService } from "../../Helpers/Steps/steps.service";
import { AppService } from "../app.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DomSanitizer } from "@angular/platform-browser";
import { BehaviorSubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { mandotorylFiles } from "../../Helpers/utils";

@Injectable({
  providedIn: "root",
})
export class TreatmentService {
  constructor(
    private spinner: NgxSpinnerService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private router: Router,
    private treatmentRequests: TreatmentRequestsService,
    private stepsService: StepsService,
    private appService: AppService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private translate: TranslateService
  ) {}

  private result$ = new BehaviorSubject({});
  getResult$ = this.result$.asObservable();

  setResult(result: any) {
    this.result$.next(result);
  }

  AddTreatmentInfos(
    data: any,
    patientId: any,
    stepId: Number,
    stepName: string
  ) {
    this.spinner.show();

    this.treatmentRequests.addTreatInfo(data, patientId).subscribe(
      (data) => {
        this.spinner.hide();

        this.handleAlerts.handleSweetAlert(
          this.translate.instant(
            "alert-msg.treatment-service.success-add-infos"
          ),
          "success",
          false
        );
        this.appService.setTreatment(data);

        if (stepId !== 5) {
          this.router.navigate([
            `/treatment/new-treatment/${patientId}/${stepName}`,
          ]);
          this.stepsService.markCurrentStep(stepId);
        } else if (stepId === 5) {
          this.stepsService.markCLikcedSave(true);
        }
      },

      (err) => {
        this.handleErrors.handleError(err);
        this.spinner.hide();

        this.handleAlerts.handleSweetAlert(
          this.translate.instant(
            "alert-msg.treatment-service.failed-add-treat"
          ),
          "error",
          false
        );
      }
    );
  }

  UpdateTreatmentStatus(id: number, status: string) {
    this.handleAlerts.handleConfirmAlert().then((result: any) => {
      // Check if the user clicked "Yes"
      if (result.isConfirmed) {
        this.treatmentRequests.updateTreatmentStatus(id, status).subscribe(
          (data) => {
            this.appService.setTreatment(data);

            this.spinner.hide();

            this.handleAlerts.handleSweetAlert(
              this.translate.instant(
                "alert-msg.treatment-service.success-update-treat"
              ),

              "success",
              false
            );

            if (status === "COMPLETED") {
              this.router.navigate(["/treatment/list"]);
            }
          },
          (err) => {
            //this.errors = this.handleErrors.handleError(err);
            this.spinner.hide();

            this.handleAlerts.handleSweetAlert(
              this.translate.instant(
                "alert-msg.treatment-service.failed-update-treat"
              ),

              "error",
              false
            );
          }
        );
      }
    });
  }

  DeleteTreatment(id: number, navigateToList: boolean) {
    this.handleAlerts.handleConfirmAlert().then((result) => {
      if (result.isConfirmed) {
        this.treatmentRequests.deleteTreatment(id).subscribe(
          (data) => {
            this.appService.setTreatments(data);
            this.spinner.hide();

            this.handleAlerts.handleSweetAlert(
              this.translate.instant(
                "alert-msg.treatment-service.success-delete-treat"
              ),

              "success",
              false
            );
            if (navigateToList) {
              this.router.navigate(["/treatment/list"]);
            }
          },
          (err) => {
            this.spinner.hide();
            this.handleErrors.handleError(err);
            this.handleAlerts.handleSweetAlert(
              this.translate.instant(
                "alert-msg.treatment-service.failed-delete-treat"
              ),
              "error",
              false
            );
          }
        );
      }
    });
  }

  AddTeam(id: number, admins: any) {
    this.spinner.show();
    this.treatmentRequests.addTeam(id, admins).subscribe(
      (data) => {
        this.appService.setTreatment(data);
        this.spinner.hide();
        this.handleAlerts.handleSweetAlert(
          this.translate.instant(
            "alert-msg.treatment-service.success-add-team"
          ),
          "success",
          false
        );
        this.modalService.dismissAll();
      },
      (err) => {
        console.log(err);

        this.spinner.hide();
        this.handleErrors.handleError(err);
        this.handleAlerts.handleSweetAlert(
          this.translate.instant("alert-msg.treatment-service.failed-add-team"),
          "error",
          false
        );
      }
    );
  }

  RemoveTeam(treatment: any, member: any) {
    this.handleAlerts.handleConfirmAlert().then((result: any) => {
      // Check if the user clicked "Yes"
      if (result.isConfirmed)
        this.treatmentRequests.removeTeam(treatment?.id, member.id).subscribe(
          (data) => {
            this.appService.setTreatment({ ...treatment, team: data });
            this.handleAlerts.handleSweetAlert(
              "This admin has been removed successfully.",
              "success",
              false
            );
          },
          (err) => {
            console.log(err);

            this.spinner.hide();

            this.handleAlerts.handleSweetAlert(
              "Check your data input carefully.",
              "error",
              false
            );
          }
        );
    });
  }

  AddTreatPhotos(files: any, id: any, name: any, comment: any) {
    this.spinner.show();

    this.treatmentRequests.addTreatPhotos(files, id, name, comment).subscribe(
      (data) => {
        this.spinner.hide();
        this.appService.setTreatment(data);

        this.handleAlerts.handleSweetAlert(
          this.translate.instant(
            "alert-msg.treatment-service.success-add-files"
          ),
          "success",
          false
        );

        this.setResult(true);
      },

      (err) => {
        this.handleErrors.handleError(err);
        this.spinner.hide();

        this.handleAlerts.handleSweetAlert(
          this.translate.instant(
            "alert-msg.treatment-service.failed-add-files"
          ),
          "error",
          false
        );
        this.setResult(false);
      }
    );

    return this.getResult$;
  }

  AddTreatFile(files: any, id: any, role: any) {
    this.spinner.show();

    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      this.treatmentRequests.addTreatFile(element, id, role).subscribe(
        (data) => {
          console.log();
          this.handleAlerts.handleSweetAlert(
            this.translate.instant(
              "alert-msg.treatment-service.success-add-files"
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
              "alert-msg.treatment-service.failed-add-files"
            ),
            "error",
            false
          );
        }
      );
    }
    this.spinner.hide();
  }

  GetInitPatientsTreat(id: number) {
    this.spinner.show();
    this.treatmentRequests.getInitPaatientTreat(id).subscribe(
      (data) => {
        this.spinner.hide();
        this.appService.setTreatment(data);
      },
      (err) => {
        this.spinner.hide();
        this.handleErrors.handleError(err);
      }
    );
  }

  AddTreatTeeth(data: any, idTreat: number, idPatient: number) {
    this.spinner.show();

    this.treatmentRequests.addTreatTeeth(data, idTreat).subscribe(
      (data) => {
        this.spinner.hide();

        this.handleAlerts.handleSweetAlert(
          this.translate.instant(
            "alert-msg.treatment-service.success-add-teeth"
          ),
          "success",
          false
        );
        this.stepsService.markCurrentStep(3);
        this.router.navigate([`/treatment/new-treatment/${idPatient}/photos`]);
      },
      (err) => {
        this.handleErrors.handleError(err);
        this.spinner.hide();

        this.handleAlerts.handleSweetAlert(
          this.translate.instant(
            "alert-msg.treatment-service.failed-add-teeth"
          ),
          "error",
          false
        );
      }
    );
  }

  GetTreatPhotos(file: any, treatId: any, existedFiles$: any) {
    this.treatmentRequests.getTreatPhoto(file.id, treatId).subscribe(
      (data: any) => {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          const imageUrl = this.sanitizer.bypassSecurityTrustUrl(
            URL.createObjectURL(data)
          );

          existedFiles$ = existedFiles$.push({
            id: file.id,
            imageUrl: imageUrl,
            type: file.type,
            name: file.name,
          });
        };

        reader.readAsDataURL(data);
        this.spinner.hide();
      },
      (err: any) => {
        this.spinner.hide();
        this.handleErrors.handleError(err);
      }
    );

    return existedFiles$;
  }

  DeleteFile(file: any, treatment$: any, existedFiles$: any, type: string) {
    console.log(file);

    this.handleAlerts.handleConfirmAlert().then((result: any) => {
      // Check if the user clicked "Yes"
      if (result.isConfirmed) {
        this.spinner.show();
        this.treatmentRequests.deleteFile(file.id).subscribe(
          (data) => {
            existedFiles$ = existedFiles$.filter(
              (file: any) => file.id !== file.id
            );

            if (type === "photos") {
              this.appService.setTreatment({
                ...treatment$,
                photos: treatment$.photos.filter(
                  (photo: any) => photo.id !== file.id
                ),
              });
            } else {
              this.appService.setTreatment({
                ...treatment$,
                clinics: treatment$.clinics.filter(
                  (photo: any) => photo.id !== file.id
                ),
              });
            }

            if (file.split(".")[0] in mandotorylFiles) {
              this.UpdateTreatmentStatus(treatment$.id, "NEW");
            }

            this.spinner.hide();
            this.handleAlerts.handleSweetAlert(data.message, "success", false);
          },
          (err) => {
            this.handleErrors.handleError(err);
            this.spinner.hide();

            this.handleAlerts.handleSweetAlert(
              this.translate.instant(
                "alert-msg.treatment-service.success-delete-file"
              ),
              "error",
              false
            );
          }
        );
      }
    });

    return existedFiles$;
  }

  GetTreatments() {
    this.spinner.show();
    this.treatmentRequests.getTreatments().subscribe(
      (data) => {
        this.spinner.hide();

        this.appService.setTreatments(data);
      },
      (err) => {
        this.spinner.hide();
        this.handleErrors.handleError(err);
      }
    );
  }
  GetDoctorTreatments(id: Number) {
    this.spinner.show();
    this.treatmentRequests.getTreatmentsByIdDoctor(id).subscribe(
      (data) => {
        console.log(data);

        this.spinner.hide();

        this.appService.setTreatments(data);
      },
      (err) => {
        this.spinner.hide();
        this.handleErrors.handleError(err);
      }
    );
  }

  GetTreatmentById(id: Number) {
    this.spinner.show();
    this.treatmentRequests.getTreatmentById(id).subscribe(
      (data) => {
        this.spinner.hide();
        this.appService.setTreatment(data);
        //   this.treatment$ = data;
      },
      (err) => {
        this.spinner.hide();
        this.handleErrors.handleError(err);
      }
    );
  }

  AddTreatInfoEligible(data: any, id: any) {
    this.treatmentRequests.addTreatInfo(data, id).subscribe(
      (data) => {
        this.spinner.hide();
        this.appService.setTreatment(data);
        this.handleAlerts.handleSweetAlert(
          this.translate.instant(
            "alert-msg.treatment-service.success-add-infos"
          ),
          "success",
          false
        );

        this.setResult(true);
      },
      (err) => {
        console.log(err);

        this.spinner.hide();
        this.handleErrors.handleError(err);

        this.handleAlerts.handleSweetAlert(
          this.translate.instant(
            "alert-msg.treatment-service.failed-add-infos"
          ),
          "error",
          false
        );
        this.setResult(false);
      }
    );

    return this.getResult$;
  }
}
