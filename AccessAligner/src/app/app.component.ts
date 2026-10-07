import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import "animate.css";
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientModule } from "@angular/common/http";

import { NetworkService } from "./Core/Services/NetworkService/network.service";
import { HandleAlertsService } from "./Core/Helpers/handle-alerts.service";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerModule, HttpClientModule, NgOptimizedImage],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  isSlowNetwork: boolean = false;

  constructor(
    private networkService: NetworkService,
    private handleAlerts: HandleAlertsService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.translate.setDefaultLang("fr");
    this.translate.use("fr");

    this.networkService.slowNetwork$.subscribe((isSlow) => {
      this.isSlowNetwork = isSlow;

      if (isSlow)
        this.handleAlerts.handleSweetAlert(
          this.translate.instant("alert-msg.network-alert"),
          "error",
          false
        );
    });

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log("Language changed to:", event.lang);
    });
  }
}
