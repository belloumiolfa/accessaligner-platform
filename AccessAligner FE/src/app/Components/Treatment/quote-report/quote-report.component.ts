import { Component, ElementRef, ViewChild } from "@angular/core";
import { NgxDropzoneModule } from "ngx-dropzone";
import { AppService } from "../../../Core/Services/app.service";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { EstimateService } from "../../../Core/Services/EstimateService/estimate.service";

import { ModalService } from "../../../Core/Helpers/modal.service";
import { NgxExtendedPdfViewerModule } from "ngx-extended-pdf-viewer";
import { StatusClassService } from "../../../Core/Helpers/status-class.service";
import { NgxSpinnerService } from "ngx-spinner";
import { HandleAlertsService } from "../../../Core/Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../../Core/Helpers/handle-errors.service";
import { UtilsService } from "../../../Auth/Helpers/utils.service";
import { EstimateRequestsService } from "../../../Core/Requests/Estimate/estimate-requests.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-quote-report",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    NgxExtendedPdfViewerModule,
    TranslateModule,
  ],
  templateUrl: "./quote-report.component.html",
  styleUrl: "./quote-report.component.css",
})
export class QuoteReportComponent {
  estimateForm!: FormGroup<any>;
  totalAfterDiscount!: any;
  treatment$!: any;
  queteModal = false;
  estimates: any[] = [];

  spinnerSHow: boolean = true;

  @ViewChild("content") content!: ElementRef;
  errors: any;
  user$!: any;

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private estimateService: EstimateService,
    private estimateRequests: EstimateRequestsService,
    private modalService: ModalService,
    private statusService: StatusClassService,
    private spinner: NgxSpinnerService,
    private handleAlerts: HandleAlertsService,
    private handleErrors: HandleErrorsService,
    public utils: UtilsService
  ) {
    this.appService.getUser$.subscribe((data) => (this.user$ = data));

    this.appService.getTreatment$.subscribe((data) => {
      this.treatment$ = data;
      this.getEstimates();
    });

    this.estimateForm = this.formBuilder.group({
      upper: new FormControl("", [Validators.required]),
      priceUpper: new FormControl("", [Validators.required]),
      lower: new FormControl("", [Validators.required]),
      priceLower: new FormControl("", [Validators.required]),
      discount: new FormControl("", [Validators.required]),
    });
  }

  getEstimates() {
    let estimatesWithURL: any[] = [];

    this.treatment$.estimates?.forEach((element: any) => {
      this.estimateRequests.getPdfFile(element.file.id).subscribe(
        (data) => {
          element = { ...element, blob: data };
          estimatesWithURL.push(element);
          this.spinnerSHow = false;
        },
        (err) => {
          this.spinner.hide();
          this.errors = this.handleErrors.handleError(err);

          this.handleAlerts.handleSweetAlert(
            "Check your data input carefully.",
            "error",
            false
          );
        }
      );
    });

    this.estimates = estimatesWithURL;
  }

  onOpenModal() {
    this.modalService.openEtimateModel();
  }

  onOpenPdf(file: any) {
    window.open(URL.createObjectURL(file.blob)); // will open a new tab
  }

  show = false;
  onUpdateStatus(estimate: any, status: string) {
    this.estimateService.UpdateEstimateStatus(
      estimate.id,
      status,
      this.treatment$
    );
  }

  onDeleteFile(id: any) {
    this.estimateService.DeleteEstimate(this.treatment$, Number(id));
  }

  onDeleteAll(id: any) {
    this.estimateService
      .DeleteAllEstimates(this.treatment$, this.estimates, id)
      .subscribe((res) => {
        if (res === true) {
          this.show = !this.show;
        }
      });
  }

  getSatusClass(status: string): string {
    return this.statusService.getClassStatus(status);
  }

  finishAcceptedEstimate() {
    return this.treatment$.estimates.filter(
      (e: any) => e.status === "ACCEPTED" && e.file.role === "final_estim"
    )[0];
  }
}
