import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { NgxDropzoneModule } from "ngx-dropzone";
import { AddFileComponent } from "../../../Shared/Elements/add-file/add-file.component";
import { AppService } from "../../../Core/Services/app.service";
import { TreatmentService } from "../../../Core/Services/TreatService/treatment.service";
import { NgxSpinnerService } from "ngx-spinner";
import { HandleAlertsService } from "../../../Core/Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../../Core/Helpers/handle-errors.service";
import Swal from "sweetalert2";
import { StepsService } from "../../../Core/Helpers/Steps/steps.service";
import { Router } from "@angular/router";
import { FileService } from "../../../Core/Helpers/file.service";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
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
  selector: "app-new-treat-photos",
  standalone: true,
  imports: [
    CommonModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
    AddFileComponent,
    TranslateModule,
  ],
  templateUrl: "./new-treat-photos.component.html",
  styleUrl: "./new-treat-photos.component.css",
})
export class NewTreatPhotosComponent {
  files: File[] = [];
  existedFiles$: any[] = [];
  comment = new FormControl("");
  photos: any[] = [];
  treatment$!: any;
  errors: any;
  lang!: string;
  constructor(
    private appService: AppService,
    private treatmentService: TreatmentService,
    private spinner: NgxSpinnerService,
    private stepService: StepsService,
    private fileServices: FileService,
    private router: Router,
    private stepsService: StepsService,
    private translate: TranslateService
  ) {
    this.lang = this.translate.currentLang; // or this.translate.getDefaultLang();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });

    if (this.lang == "en") this.photos = clinicalPhotos;
    else this.photos = clinicalPhotosFrench;

    this.stepService.markdetectedChange(false);
    this.stepService.markCLikcedSave(false);

    this.appService.getTreatment$.subscribe((data) => {
      this.treatment$ = data;
      if (this.treatment$.photosComment !== "null")
        this.comment.setValue(this.treatment$.photosComment);

      this.existedFiles$ = this.fileServices.getFiles(
        this.treatment$?.photos,
        this.treatment$?.id
      );
    });
    this.stepService.markdetectedChange(false);
    this.stepService.markCLikcedSave(false);
  }

  existedFile(photo: any) {
    const result = this.existedFiles$!?.filter(
      (file: any) => file?.name?.split(".")[0] === photo.name
    );
    return result[0];
  }

  onChangeFile(e: any) {
    this.files.push(e);
    this.stepService.markdetectedChange(true);
  }

  onDeleteFile(event: any) {
    this.existedFiles$ = this.treatmentService.DeleteFile(
      event,
      this.treatment$,
      this.existedFiles$,
      "photos"
    );
  }

  onSubmit(e: any) {
    this.stepService.markCLikcedSave(true);

    e.preventDefault();
    this.spinner.show();

    this.treatmentService
      .AddTreatPhotos(
        this.files,
        this.treatment$.id,
        "photo",
        this.comment.value
      )
      .subscribe((res) => {
        if (res === true) {
          this.files = [];
          this.router.navigate([
            `/treatment/new-treatment/${this.treatment$.patient?.id}/clinics`,
          ]);
          this.stepsService.markCurrentStep(4);
        }
      });
  }

  onReset() {
    this.files = [];
  }
}
