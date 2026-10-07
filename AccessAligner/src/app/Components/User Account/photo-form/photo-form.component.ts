import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { AppService } from "../../../Core/Services/app.service";
import { NgxDropzoneModule } from "ngx-dropzone";
import { NgxSpinnerService } from "ngx-spinner";
import { HandleErrorsService } from "../../../Core/Helpers/handle-errors.service";
import { UserService } from "../../../Core/Services/UserService/user.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-photo-form",
  standalone: true,
  imports: [CommonModule, NgxDropzoneModule, TranslateModule, TranslateModule],
  templateUrl: "./photo-form.component.html",
  styleUrl: "./photo-form.component.css",
})
export class PhotoFormComponent {
  selectedFile: File[] = [];
  user$!: any;
  errors!: any;

  constructor(
    private appService: AppService,
    private handleErrors: HandleErrorsService,
    private spinner: NgxSpinnerService,
    private userService: UserService
  ) {
    this.appService.getUser$.subscribe((data) => (this.user$ = data));
  }

  onSelect(event: any) {
    this.selectedFile = event.addedFiles;
    this.renameFile();
  }

  onRemove(event: any) {
    this.selectedFile.splice(this.selectedFile.indexOf(event), 1);
  }

  renameFile() {
    if (this.selectedFile) {
      // Extract file extension from original filename
      const originalFilenameParts = this.selectedFile[0].name.split(".");
      const fileExtension =
        originalFilenameParts[originalFilenameParts.length - 1];

      // Create new filename with desired name and original extension
      const newFilename = `photo-${this.user$.id}.` + fileExtension;

      // Create new File object with the new filename and original content
      const renamedFile = new File([this.selectedFile[0]], newFilename, {
        type: this.selectedFile[0].type,
      });

      // Now you can use the renamedFile object as needed
      this.selectedFile[0] = renamedFile;
    }
  }

  submitPhoto(event$: any) {
    event$.preventDefault();

    this.errors = this.handleErrors.handleError({});
    this.spinner.show();

    this.userService.UpdatePhoto(this.selectedFile[0], this.user$.id);
  }
}
