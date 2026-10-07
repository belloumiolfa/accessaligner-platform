import { Component } from "@angular/core";
import { AppService } from "../../../Core/Services/app.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { StlModelViewerModule } from "angular-stl-model-viewer";
import { ModalService } from "../../../Core/Helpers/modal.service";
import { TreatmentService } from "../../../Core/Services/TreatService/treatment.service";
import { FileService } from "../../../Core/Helpers/file.service";
import {
  clinicalScans,
  clinicalScansFrench,
} from "../../../Shared/Static Data/clinical-scans";
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from "@ngx-translate/core";

@Component({
  selector: "app-clinics",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    StlModelViewerModule,
    TranslateModule,
  ],
  templateUrl: "./clinics.component.html",
  styleUrl: "./clinics.component.css",
})
export class ClinicsComponent {
  show = false;

  files: File[] = [];
  existedFiles$: any[] = [];
  showSpinner: any;

  clinics!: any[];

  treatment$!: any;
  errors: any;
  lang!: string;

  constructor(
    private appService: AppService,
    private modalService: ModalService,
    private treatmentService: TreatmentService,
    private fileServices: FileService,
    private translate: TranslateService
  ) {
    this.lang = this.translate.currentLang; // or this.translate.getDefaultLang();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
    if (this.lang == "en") this.clinics = clinicalScans;
    else this.clinics = clinicalScansFrench;

    this.appService.getTreatment$.subscribe((data: any) => {
      this.treatment$ = data;
      this.appService.getShowSpinner$.subscribe((data) => {
        this.showSpinner = data;
      });
    });
    this.appService.getTreatment$.subscribe((data) => {
      this.treatment$ = data;
    });
    this.appService.getTreatClinics$.subscribe((data) => {
      this.existedFiles$ = this.fileServices.getFiles(
        data,
        this.treatment$?.id
      );
    });
  }

  getPhotographs(file: any, treatId: any) {
    this.existedFiles$ = this.treatmentService.GetTreatPhotos(
      file.id,
      treatId,
      this.existedFiles$
    );
  }

  existedFile(photo: any) {
    const result = this.existedFiles$?.filter(
      (file: { name: string }) => file?.name?.split(".")[0] == photo.name
    );

    return result && result[0];
  }

  safeUrlToString(safeUrl: any): string {
    return (
      safeUrl["changingThisBreaksApplicationSecurity"] ||
      (safeUrl as any).changingThisBreaksApplicationSecurity
    );
  }

  openModal(item: any) {
    this.modalService.openDisplayPhtotoModel(item);
  }
}
