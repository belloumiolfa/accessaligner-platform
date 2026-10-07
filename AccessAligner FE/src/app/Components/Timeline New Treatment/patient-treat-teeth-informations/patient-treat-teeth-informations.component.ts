import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { teeth } from "../../../Shared/Static Data/teeth";
import {
  colorsTeeth,
  colorsTeethFrench,
} from "../../../Shared/Static Data/colors-teeth";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
@Component({
  selector: "app-patient-treat-teeth-informations",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./patient-treat-teeth-informations.component.html",
  styleUrl: "./patient-treat-teeth-informations.component.css",
})
export class PatientTreatTeethInformationsComponent implements OnInit {
  @Input() treatment: any;

  colors!: any[];
  color: any = {};
  teethTab: any[] = [];
  treatment$!: any;
  lang!: string;

  constructor(private translate: TranslateService) {
    this.lang = this.translate.currentLang; // or this.translate.getDefaultLang();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });

    if (this.lang == "en") this.colors = colorsTeeth;
    else this.colors = colorsTeethFrench;
  }

  ngOnInit(): void {
    this.treatment$ = this.treatment;
    this.teethTab.forEach((e) => {
      e.status = 0;
      e.color = "";
    });

    this.teethTab = teeth;

    this.treatment$.teeth?.forEach((element: any) => {
      this.changeColor(element.num, this.colors[element.action]);
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
}
