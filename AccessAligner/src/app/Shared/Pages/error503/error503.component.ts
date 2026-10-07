import { Component } from "@angular/core";
import { HelpLinkComponent } from "../../Elements/help-link/help-link.component";
import { BackHomeComponent } from "../../Elements/back-home/back-home.component";
import { TranslateModule } from "@ngx-translate/core";
import { SearchComponent } from "../../Elements/search/search.component";

@Component({
  selector: "app-error503",
  standalone: true,
  imports: [
    HelpLinkComponent,
    BackHomeComponent,
    TranslateModule,
    SearchComponent,
  ],
  templateUrl: "./error503.component.html",
  styleUrl: "./error503.component.css",
})
export class Error503Component {}
