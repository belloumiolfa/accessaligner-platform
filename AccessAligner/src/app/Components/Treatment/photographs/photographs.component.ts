import { Component } from "@angular/core";
import { AppService } from "../../../Core/Services/app.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ModalService } from "../../../Core/Helpers/modal.service";
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
  selector: "app-photographs",
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, TranslateModule],
  templateUrl: "./photographs.component.html",
  styleUrl: "./photographs.component.css",
})
export class PhotographsComponent {
  show = false;
  files: File[] = [];
  existedFiles$: any[] = [];
  photos: any[] = [];
  treatment$!: any;
  lang!: string;

  constructor(
    private appService: AppService,
    private modalService: ModalService,
    private fileServices: FileService,
    private translate: TranslateService
  ) {
    this.lang = this.translate.currentLang; // or this.translate.getDefaultLang();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
    if (this.lang == "en") this.photos = clinicalPhotos;
    else this.photos = clinicalPhotosFrench;

    this.appService.getTreatment$.subscribe((data) => {
      this.treatment$ = data;
    });
    this.appService.getTreatPhotos$.subscribe((data) => {
      this.existedFiles$ = this.fileServices.getFiles(
        data,
        this.treatment$?.id
      );
    });
  }
  onOpenPhoto(data: any) {
    console.log(data);

    this.modalService.openDisplayPhtotoModel(data);
  }

  existedFile(photo: any) {
    const result = this.existedFiles$!?.filter(
      (file: { name: string }) => file?.name?.split(".")[0] == photo.name
    );

    return result[0];
  }

  openModal(item: any) {
    this.modalService.openDisplayPhtotoModel(item);
  }
}
