import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { BehaviorSubject } from "rxjs";

import { NgxSpinnerService } from "ngx-spinner";
import { HandleAlertsService } from "../../Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../Helpers/handle-errors.service";
import { AppService } from "../app.service";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { EstimateRequestsService } from "../../Requests/Estimate/estimate-requests.service";
import { TranslateService } from "@ngx-translate/core";
import { TreatmentService } from "../TreatService/treatment.service";

@Injectable({
  providedIn: "root",
})
export class EstimateService {
  apiBaseUrl = environment.apiBaseUrl;
  constructor(
    private spinner: NgxSpinnerService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private estimateRequests: EstimateRequestsService,
    private appService: AppService,
    private treatmentService: TreatmentService,
    private translate: TranslateService
  ) {}

  private result$ = new BehaviorSubject({});

  getResult$ = this.result$.asObservable();

  setResult(result: any) {
    this.result$.next(result);
  }

  generatePdf(htmlContent: HTMLElement, fileName: any): Promise<any> {
    return new Promise((resolve, reject) => {
      html2canvas(htmlContent)
        .then((canvas) => {
          // Initialize jsPDF
          const pdf = new jsPDF("p", "mm", "a4");
          const imgData = canvas.toDataURL("image/png");
          pdf.addImage(imgData, "PNG", 0, 0, 210, 297); // landscape A4 dimensions

          // Save pdf
          pdf.save(fileName + ".pdf");

          // Generate Blob
          var blobPDF = new Blob([pdf.output("blob")], {
            type: "application/pdf",
          });
          resolve(blobPDF);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  UploadPDFFile(content: any, role: any, treatId: any) {
    this.generatePdf(content, role)
      .then((data) => {
        const fileName = role + "_treat_" + treatId + ".pdf";
        this.estimateRequests
          .uploadPdfFile(data, treatId, role, fileName)
          .subscribe(
            (data) => {
              this.spinner.hide();
              this.appService.setTreatment(data);
              this.handleAlerts.handleSweetAlert(
                this.translate.instant(
                  "alert-msg.estimate-service.success-upload-msg"
                ),
                "success",
                false
              );
              console.log("perfct");
            },
            (err) => {
              console.log(err);
              this.spinner.hide();
              this.handleErrors.handleError(err);
              this.handleAlerts.handleSweetAlert(
                this.translate.instant(
                  "alert-msg.estimate-service.failed-upload-msg"
                ),
                "error",
                false
              );
            }
          );
      })
      .catch((error) => {
        this.spinner.hide();
        this.handleAlerts.handleSweetAlert(
          this.translate.instant(
            "alert-msg.estimate-service.failed-generate-pdf"
          ),
          "error",
          false
        );
      });
  }

  UpdateEstimateStatus(id: any, status: any, treatment$: any) {
    this.handleAlerts.handleConfirmAlert().then((result) => {
      if (result.isConfirmed) {
        this.estimateRequests.updateEstimateStatus(id, status).subscribe(
          (data) => {
            let estimates: any[] = treatment$.estimates;

            for (let index = 0; index < estimates.length; index++) {
              if (estimates[index].id === data.id) {
                estimates[index] = data;
              }
            }
            this.appService.setTreatment({
              ...treatment$,
              estimates: estimates,
            });
            if (status === "ACCEPTED") {
              this.treatmentService.UpdateTreatmentStatus(
                treatment$.id,
                "CONFIRMED"
              );
            }
            this.spinner.hide();
            this.handleAlerts.handleSweetAlert(
              this.translate.instant(
                "alert-msg.estimate-service.success-update-estimate"
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
                "alert-msg.estimate-service.failed-update-estimate"
              ),
              "error",
              false
            );
          }
        );
      }
    });
  }

  DeleteEstimate(treatment$: any, id: any) {
    this.spinner.show();

    this.estimateRequests.deleteEstimate(id).subscribe(
      (data) => {
        this.spinner.hide();

        this.appService.setTreatment({
          ...treatment$,
          estimates: treatment$.estimates.filter((e: any) => e.id != id),
        });
        this.handleAlerts.handleSweetAlert(
          this.translate.instant(
            "alert-msg.estimate-service.success-delete-estimate"
          ),
          "success",
          false
        );
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
        this.handleAlerts.handleSweetAlert(
          this.translate.instant(
            "alert-msg.estimate-service.failed-delete-estimate"
          ),
          "error",
          false
        );
      }
    );
  }

  DeleteAllEstimates(treatment$: any, estimates: any, id: any) {
    this.spinner.show();

    this.estimateRequests.deleteALLEstimate(id).subscribe(
      (data) => {
        this.setResult(true);
        this.spinner.hide();
        this.appService.setTreatment({ ...treatment$, estimates: [] });
        this.handleAlerts.handleSweetAlert(
          this.translate.instant(
            "alert-msg.estimate-service.success-delete-all-estimate"
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
            "alert-msg.estimate-service.failed-delete-all-estimate"
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
