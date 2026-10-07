import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { EstimateService } from "../../../Core/Services/EstimateService/estimate.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
@Component({
  selector: "app-content-devis-treat",
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: "./content-devis-treat.component.html",
  styleUrl: "./content-devis-treat.component.css",
})
export class ContentDevisTreatComponent {
  @Input() treatment: any;
  @Input() dataDevis: any;
  errors!: any;
  email: string = "contact@accessaligner.com";

  constructor(
    private estimateService: EstimateService,
    private activeModal: NgbActiveModal
  ) {}

  getCurrentDate() {
    return new Date();
  }

  @ViewChild("contentToExport", { static: false }) contentToExport!: ElementRef;

  exportToPdf() {
    const content = this.contentToExport.nativeElement;
    let role =
      this.treatment.plans.length > 0
        ? /*  this.treatment.photos.length >= 9 &&
      this.treatment.clinics >= 3 */
          "final_estim"
        : "Init_estim";

    this.estimateService.UploadPDFFile(content, role, this.treatment.id);

    this.activeModal.close();
  }
}
