import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { AppService } from "../../Core/Services/app.service";

import { RouterModule } from "@angular/router";
import { StatusClassService } from "../../Core/Helpers/status-class.service";
import { TeamInfoComponent } from "../../Shared/Elements/team-info/team-info.component";
import { UtilsService } from "../../Auth/Helpers/utils.service";
import { TreatmentRequestsService } from "../../Core/Requests/Treatment/treatment-requests.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-task-menu",
  standalone: true,
  imports: [CommonModule, RouterModule, TeamInfoComponent, TranslateModule],
  templateUrl: "./task-menu.component.html",
  styleUrl: "./task-menu.component.css",
})
export class TaskMenuComponent {
  @Input() action!: any;
  user$!: any;
  treatment$: any;

  constructor(
    private appService: AppService,
    private treatmentRequests: TreatmentRequestsService,
    private statusService: StatusClassService,
    private utilsService: UtilsService
  ) {
    this.appService.getUser$.subscribe((data: any) => {
      this.user$ = data;

      this.getTreatmentsUser(data?.id);
    });
  }

  getTreatmentsUser(id: any) {
    if (id != undefined) {
      this.treatmentRequests.getTreatments().subscribe((data) => {
        if (this.utilsService.isDoctor(this.user$)) {
          this.treatment$ = data.filter(
            (treat: any) =>
              treat.status === "PROGRESS" &&
              treat.patient?.doctor?.id === this.user$.id
          );
        } else {
          this.treatment$ = data.filter(
            (treat: any) => treat.status === "PROGRESS"
          );
        }
      });
    }
  }

  calculateCompletionPercentage(dataObject: any) {
    let totalFields = 0;
    let completedFields = 0;

    if (dataObject.status === "FINISHED") {
      return 100;
    }

    for (let key in dataObject) {
      if (dataObject.hasOwnProperty(key)) {
        totalFields++;

        if (key === "photos") {
          if (dataObject["photos"] === 10) completedFields++;
        } else if (key === "clinics") {
          if (dataObject["clinics"] === 4) completedFields++;
        } else if (key === "plans") {
          if (dataObject["plans"] > 0) completedFields++;
        } else {
          if (
            dataObject[key] !== null &&
            dataObject[key] !== undefined &&
            dataObject[key] !== ""
          ) {
            completedFields++;
          }
        }
      }
    }

    // Calculate percentage
    if (totalFields === 0) {
      return 0; // Avoid division by zero
    } else {
      return Math.trunc((completedFields / totalFields) * 100);
    }
  }

  getStatusClass(status: any): string {
    return this.statusService.getClassStatus(status);
  }
}
