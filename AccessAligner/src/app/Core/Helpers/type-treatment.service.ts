import { Injectable } from "@angular/core";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class TypeTreatmentService {
  lang!: any;
  constructor(private translate: TranslateService) {
    this.lang = this.translate.currentLang; // or this.translate.getDefaultLang();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
  }

  getTypeTreatement(type: string) {
    if (type == "I")
      return this.translate.instant("type-treat.lower-arch-label");
    else if (type == "S")
      return this.translate.instant("type-treat.upper-arch-label");
    else if (type == "IS")
      return this.translate.instant("type-treat.upper-lower-label");
    else return this.translate.instant("type-treat.nothing");
  }
}
