import { Component } from "@angular/core";
import { BlockHeaderComponent } from "../../../Shared/Elements/block-header/block-header.component";
import { RouterOutlet } from "@angular/router";
import { TreatmentService } from "../../../Core/Services/TreatService/treatment.service";
import { TranslateModule } from "@ngx-translate/core";
import { UtilsService } from "../../../Auth/Helpers/utils.service";
import { AppService } from "../../../Core/Services/app.service";

@Component({
  selector: "app-treatment",
  standalone: true,
  imports: [RouterOutlet, BlockHeaderComponent, TranslateModule],
  templateUrl: "./treatment.component.html",
  styleUrl: "./treatment.component.css",
})
export class TreatmentComponent {
  errors: any;
  constructor(
    private treatmentService: TreatmentService,
    private appService: AppService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.appService.getUser$.subscribe((dataUser: any) => {
      if (dataUser.id != null) {
        if (this.utilsService.isDoctor(dataUser)) {
          console.log("dentist");

          this.treatmentService.GetDoctorTreatments(dataUser.id);
        } else {
          console.log("not dentist");

          this.treatmentService.GetTreatments();
        }
      }
    });
  }
}
