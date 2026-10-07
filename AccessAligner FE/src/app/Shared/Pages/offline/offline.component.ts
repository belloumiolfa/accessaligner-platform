import { Component } from "@angular/core";
import { HelpLinkComponent } from "../../Elements/help-link/help-link.component";
import { BackHomeComponent } from "../../Elements/back-home/back-home.component";
import { TranslateModule } from "@ngx-translate/core";
import { SearchComponent } from "../../Elements/search/search.component";

@Component({
  selector: "app-offline",
  standalone: true,
  imports: [
    HelpLinkComponent,
    BackHomeComponent,
    TranslateModule,
    SearchComponent,
  ],
  templateUrl: "./offline.component.html",
  styleUrl: "./offline.component.css",
})
export class OfflineComponent {}
