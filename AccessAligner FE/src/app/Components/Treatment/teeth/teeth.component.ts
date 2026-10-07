import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { teeth } from "../../../Shared/Static Data/teeth";
import { PatientTreatTeethInformationsComponent } from "../../Timeline New Treatment/patient-treat-teeth-informations/patient-treat-teeth-informations.component";
import { AppService } from "../../../Core/Services/app.service";
import { RouterModule } from "@angular/router";
import {
  colorsTeeth,
  colorsTeethFrench,
} from "../../../Shared/Static Data/colors-teeth";
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from "@ngx-translate/core";
import { TypeTreatmentService } from "../../../Core/Helpers/type-treatment.service";
@Component({
  selector: "app-teeth",
  standalone: true,
  imports: [
    CommonModule,
    PatientTreatTeethInformationsComponent,
    RouterModule,
    TranslateModule,
  ],
  templateUrl: "./teeth.component.html",
  styleUrl: "./teeth.component.css",
})
export class TeethComponent implements OnInit {
  treatment$: any;
  teethTab = teeth;
  colors!: any[];
  show = false;
  lang!: string;

  constructor(
    private appService: AppService,
    private translate: TranslateService,
    private typeTreatment: TypeTreatmentService
  ) {
    this.lang = this.translate.currentLang; // or this.translate.getDefaultLang();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });

    if (this.lang == "en") this.colors = colorsTeeth;
    else this.colors = colorsTeethFrench;
  }

  ngOnInit(): void {
    this.appService.getTreatment$.subscribe((data) => {
      this.treatment$ = data;

      this.teethTab.forEach((e) => {
        e.status = 0;
        e.color = "";
      });

      this.teethTab = teeth;

      this.treatment$.teeth?.forEach((element: any) => {
        this.changeColor(element.num, this.colors[element.action]);
      });
    });
  }

  changeColor(id: number, color: any) {
    this.teethTab.find((currentItem) => {
      if (currentItem.id === id) {
        currentItem.color = color.color;
        currentItem.status = color.id;
      }
    });
  }
  getTypeTreatement(type: any) {
    return this.typeTreatment.getTypeTreatement(type);
  }
}
