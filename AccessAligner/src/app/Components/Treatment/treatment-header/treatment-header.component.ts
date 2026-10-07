import { Component, Input } from "@angular/core";
import { AppService } from "../../../Core/Services/app.service";
import { CommonModule } from "@angular/common";
import { TeamInfoComponent } from "../../../Shared/Elements/team-info/team-info.component";
import { RouterModule } from "@angular/router";
import { TreatmentService } from "../../../Core/Services/TreatService/treatment.service";
import { TypeTreatmentService } from "../../../Core/Helpers/type-treatment.service";

import { UtilsService } from "../../../Auth/Helpers/utils.service";
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from "@ngx-translate/core";

@Component({
  selector: "app-treatment-header",
  standalone: true,
  imports: [CommonModule, RouterModule, TeamInfoComponent, TranslateModule],
  templateUrl: "./treatment-header.component.html",
  styleUrl: "./treatment-header.component.css",
})
export class TreatmentHeaderComponent {
  @Input() treatment$!: any;
  show = false;
  errors: any;
  treatments$: any;
  user$!: any;
  lang!: string;

  constructor(
    private treatmentService: TreatmentService,
    private appService: AppService,
    public utils: UtilsService,
    private translate: TranslateService,
    private typeTreatment: TypeTreatmentService
  ) {
    this.lang = this.translate.currentLang; // or this.translate.getDefaultLang();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });

    appService.getUser$.subscribe((data) => (this.user$ = data));
    this.appService.getTreatments$.subscribe(
      (data) => (this.treatments$ = data)
    );
    this.appService.getTreatment$.subscribe((data) => (this.treatment$ = data));
  }
  getTypeTreatement(type: any) {
    return this.typeTreatment.getTypeTreatement(type);
  }

  onUpdateStatus(status: string) {
    this.treatmentService.UpdateTreatmentStatus(this.treatment$?.id, status);
  }

  onDelete(id: any) {
    this.treatmentService.DeleteTreatment(id, true);
  }
}
