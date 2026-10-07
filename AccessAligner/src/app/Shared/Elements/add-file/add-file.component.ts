import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from "@angular/core";
import { NgxDropzoneModule } from "ngx-dropzone";
import { ModalService } from "../../../Core/Helpers/modal.service";
import { StlModelViewerModule } from "angular-stl-model-viewer";
import { HttpEventType } from "@angular/common/http";
import { mandotorylFiles } from "../../../Core/Helpers/utils";

@Component({
  selector: "app-add-file",
  standalone: true,
  imports: [CommonModule, NgxDropzoneModule, StlModelViewerModule],

  templateUrl: "./add-file.component.html",
  styleUrl: "./add-file.component.css",
})
export class AddFileComponent {
  @Output() file = new EventEmitter<any>();
  @Output() deletedFile = new EventEmitter<any>();

  @Input() item!: any;
  @Input() existedFile!: any;
  @Input() acceptedType!: any;

  selectedFiles: File[] = [];

  showSpinner: Boolean = true;
  uploadProgress: number = 0; // Track upload progress

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    if (this.existedFile != undefined) {
      this.showSpinner = false;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["existedFile"] && changes["existedFile"].currentValue) {
      if (this.existedFile != undefined) {
        this.showSpinner = false;
      }
    }
  }
  renameFile(item: any) {
    if (this.selectedFiles) {
      // Extract file extension from original filename
      const originalFilenameParts = this.selectedFiles[0].name.split(".");
      const fileExtension =
        originalFilenameParts[originalFilenameParts.length - 1];

      // Create new filename with desired name and original extension
      const newFilename = `${item.name}.` + fileExtension;

      // Create new File object with the new filename and original content
      const renamedFile = new File([this.selectedFiles[0]], newFilename, {
        type: this.selectedFiles[0].type,
      });

      // Now you can use the renamedFile object as needed
      this.selectedFiles[0] = renamedFile;
    }
  }
  simulateUploadProgress() {
    this.uploadProgress = 0;
    const interval = setInterval(() => {
      if (this.uploadProgress < 100) {
        this.uploadProgress += 10; // Increase progress by 10% every 100ms
      } else {
        clearInterval(interval);
      }
    }, 100);
  }

  onSelect(event: any, item: any) {
    this.selectedFiles = event.addedFiles;

    this.renameFile(item);
    // Preview the file locally and show simulated progress
    this.simulateUploadProgress();

    this.file.emit(this.selectedFiles[0]);
  }

  onRemove(event: any) {
    this.selectedFiles.splice(this.selectedFiles.indexOf(event), 1);
  }

  deleteFile(existedFile: any) {
    this.deletedFile.emit(existedFile);
  }

  onOpenPhoto(data: any) {
    this.modalService.openDisplayPhtotoModel(data);
  }

  safeUrlToString(safeUrl: any): string {
    this.showSpinner = false;
    return (
      safeUrl["changingThisBreaksApplicationSecurity"] ||
      (safeUrl as any)?.changingThisBreaksApplicationSecurity
    );
  }
}
