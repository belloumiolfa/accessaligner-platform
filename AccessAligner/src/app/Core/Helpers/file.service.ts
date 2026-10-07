import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NgxSpinnerService } from "ngx-spinner";

import { TreatmentRequestsService } from "../Requests/Treatment/treatment-requests.service";

@Injectable({
  providedIn: "root",
})
export class FileService {
  constructor(
    private treatmentRequests: TreatmentRequestsService,
    private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer
  ) {}

  getFile(file: any, treatId: any): any {
    this.treatmentRequests.getTreatPhoto(file.id, treatId).subscribe(
      (data: any) => {
        let existedFile: any;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          const imageUrl = this.sanitizer.bypassSecurityTrustUrl(
            URL.createObjectURL(data)
          );

          existedFile = {
            id: file.id,
            imageUrl: imageUrl,
            type: file.type,
            name: file.name,
          };
        };

        reader.readAsDataURL(data);
        this.spinner.hide();
        return existedFile;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getFiles(files: any, treatId: any): any[] {
    let existedFiles: any[] = [];

    files?.forEach((file: any) => {
      this.treatmentRequests.getTreatPhoto(file.id, treatId).subscribe(
        (data: any) => {
          const reader = new FileReader();

          reader.onload = (e: any) => {
            const imageUrl = this.sanitizer.bypassSecurityTrustUrl(
              URL.createObjectURL(data)
            );

            let existedFile = {
              id: file.id,
              imageUrl: imageUrl,
              type: file.type,
              name: file.name,
            };
            existedFiles.push(existedFile);
          };

          reader.readAsDataURL(data);
          this.spinner.hide();
        },
        (err: any) => {
          console.log(err);
        }
      );
    });

    return existedFiles;
  }
}
