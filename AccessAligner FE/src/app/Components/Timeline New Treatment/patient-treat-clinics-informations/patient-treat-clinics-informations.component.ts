import { Component, Input, SimpleChanges } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { StlModelViewerModule } from "angular-stl-model-viewer";

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
  selector: "app-patient-treat-clinics-informations",
  standalone: true,
  imports: [CommonModule, FormsModule, StlModelViewerModule, TranslateModule],
  templateUrl: "./patient-treat-clinics-informations.component.html",
  styleUrl: "./patient-treat-clinics-informations.component.css",
})
export class PatientTreatClinicsInformationsComponent {
  treatment$!: any;
  existedFilesClinics$: any[] = [];

  @Input() treatment: any;

  clinics = clinicalScans;
  lang!: string;
  constructor(
    private fileServices: FileService,
    private translate: TranslateService
  ) {
    this.lang = this.translate.currentLang; // or this.translate.getDefaultLang();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
    if (this.lang == "en") this.clinics = clinicalScans;
    else this.clinics = clinicalScansFrench;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["treatment"] && changes["treatment"].currentValue) {
      this.existedFilesClinics$ = this.fileServices?.getFiles(
        changes["treatment"].currentValue?.clinics,
        changes["treatment"].currentValue?.id
      );
    }
  }

  existedFile(photo: any) {
    const result = this.existedFilesClinics$?.filter(
      (file: { name: string }) => file?.name?.split(".")[0] == photo.name
    );

    return result[0];
  }

  safeUrlToString(safeUrl: any): string {
    return (
      safeUrl["changingThisBreaksApplicationSecurity"] ||
      (safeUrl as any).changingThisBreaksApplicationSecurity
    );
  }
}
