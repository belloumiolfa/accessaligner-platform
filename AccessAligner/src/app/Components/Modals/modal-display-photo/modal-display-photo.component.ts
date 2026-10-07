import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { StlModelViewerModule } from "angular-stl-model-viewer";
import { UtilsService } from "../../../Auth/Helpers/utils.service";
import { AppService } from "../../../Core/Services/app.service";

@Component({
  selector: "app-modal-display-photo",
  standalone: true,
  imports: [CommonModule, StlModelViewerModule],
  templateUrl: "./modal-display-photo.component.html",
  styleUrl: "./modal-display-photo.component.css",
})
export class ModalDisplayPhotoComponent {
  @Input() data: any;
  typeImage: boolean = false;
  typeStl: boolean = false;
  typeVideo: boolean = false;
  typePDF: boolean = false;
  modelSrc: any;
  user$!: any;

  constructor(
    private activeModal: NgbActiveModal,
    public utils: UtilsService,
    private appService: AppService
  ) {
    this.appService.getUser$.subscribe((data) => {
      this.user$ = data;
    });
  }

  ngOnInit(): void {
    if (this.data) {
      if (this.data.type.includes("image")) {
        this.typeImage = true;
      } else if (this.data.type.includes("video")) {
        this.typeVideo = true;
      } else if (this.data.type.includes("pdf")) {
        this.typePDF = true;
      } else {
        this.typeStl = true;
        this.loadModel(this.data.imageUrl);
      }
    }
  }

  loadModel(path: string) {
    this.modelSrc = this.safeUrlToString(path);
  }

  safeUrlToString(safeUrl: any): string {
    return (
      safeUrl["changingThisBreaksApplicationSecurity"] ||
      (safeUrl as any).changingThisBreaksApplicationSecurity
    );
  }

  close() {
    this.activeModal.close();
  }

  downloadFile(data: any, modelSrc: any) {
    const link = document.createElement("a");

    link.href = modelSrc as string; // Cast SafeUrl to string
    link.download = data.name; // Specify the filename

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  }
}
