import { Component } from "@angular/core";
import { teeth } from "../../../Shared/Static Data/teeth";
import { CommonModule } from "@angular/common";
import { AppService } from "../../../Core/Services/app.service";
import { TreatmentService } from "../../../Core/Services/TreatService/treatment.service";

import { StepsService } from "../../../Core/Helpers/Steps/steps.service";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import {
  colorsTeeth,
  colorsTeethFrench,
} from "../../../Shared/Static Data/colors-teeth";
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from "@ngx-translate/core";
@Component({
  selector: "app-new-treat-teeth",
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule],
  templateUrl: "./new-treat-teeth.component.html",
  styleUrl: "./new-treat-teeth.component.css",
})
export class NewTreatTeethComponent {
  data: any[] = [];
  colors!: any[];
  color: any = {};
  teethTab: any[] = [];
  treatment$!: any;
  errors: any;
  pickedToChange: boolean = false;
  comment = new FormControl("");
  lang!: string;

  constructor(
    private appService: AppService,
    private treatmentService: TreatmentService,
    private stepsService: StepsService,
    private translate: TranslateService
  ) {
    this.stepsService.markdetectedChange(false);
    this.stepsService.markCLikcedSave(false);
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
      this.comment.setValue(this.treatment$.teethComment);

      this.teethTab.forEach((e) => {
        e.status = 0;
        e.color = "";
      });

      this.teethTab = teeth;

      this.treatment$.teeth?.forEach((element: any) => {
        this.onChangeColor(element.num, this.colors[element.action]);
      });
    });
  }

  onPickColor(color: any) {
    this.color = color;
    this.pickedToChange = true;
  }

  onChangeColor(id: number, color: any) {
    this.teethTab.find((currentItem) => {
      if (currentItem.id === id) {
        currentItem.color = color.color;
        currentItem.status = color.id;
      }
    });

    if (this.pickedToChange) {
      this.stepsService.markdetectedChange(true);

      this.stepsService.markCLikcedSave(false);
    }
  }
  updateTeethComment() {
    if (this.comment.value) {
      this.treatmentService.AddTreatmentInfos(
        { ...this.treatment$, teethComment: this.comment.value },
        this.treatment$.patient.id,
        3,
        "photos"
      );
    }
  }

  onSubmit() {
    this.stepsService.markCLikcedSave(true);
    this.teethTab.forEach((element) => {
      let t = { num: element.id, status: element.status };
      this.data.push(t);
    });
    let data = this.data.filter((x) => x.status != 0);
    this.treatmentService.AddTreatTeeth(
      { comment: this.comment.value, teeth: data },
      this.treatment$.id,
      this.treatment$.patient.id
    );
    this.updateTeethComment();
  }

  onReset() {
    this.treatment$.teeth?.forEach((element: any) => {
      this.onChangeColor(element.num, this.colors[element.action]);
    });
  }
}
