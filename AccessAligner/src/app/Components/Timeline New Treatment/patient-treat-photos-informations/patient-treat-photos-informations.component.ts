import { Component, Input, SimpleChanges } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FileService } from "../../../Core/Helpers/file.service";
import {
  clinicalPhotos,
  clinicalPhotosFrench,
} from "../../../Shared/Static Data/clinical-photos";
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from "@ngx-translate/core";
@Component({
  selector: "app-patient-treat-photos-informations",
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: "./patient-treat-photos-informations.component.html",
  styleUrl: "./patient-treat-photos-informations.component.css",
})
export class PatientTreatPhotosInformationsComponent {
  files: File[] = [];
  existedFiles$: any[] = [];

  @Input() treatment: any;

  photos: any[] = [];
  lang!: string;
  constructor(
    private fileServices: FileService,
    private translate: TranslateService
  ) {
    this.lang = this.translate.currentLang; // or this.translate.getDefaultLang();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
    if (this.lang == "en") this.photos = clinicalPhotos;
    else this.photos = clinicalPhotosFrench;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["treatment"] && changes["treatment"].currentValue) {
      this.existedFiles$ = this.fileServices?.getFiles(
        changes["treatment"].currentValue?.photos,
        changes["treatment"].currentValue?.id
      );
    }
  }

  existedFile(photo: any) {
    const result = this.existedFiles$?.filter(
      (file: { name: string }) => file?.name?.split(".")[0] == photo.name
    );

    return result[0];
  }
}
