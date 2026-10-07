import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, Input } from "@angular/core";
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from "@ngx-translate/core";

@Component({
  selector: "app-translate-button",
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: "./translate-button.component.html",
  styleUrl: "./translate-button.component.css",
})
export class TranslateButtonComponent {
  @Input() color!: any;
  language: any = this.translate.store.currentLang;

  constructor(
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.language = event.lang;
    });
  }

  show = false;

  changeLanguage(language: any) {
    console.log(language);

    this.translate.use(language);
    this.cdr.detectChanges();
    this.show = !this.show;
  }
}
