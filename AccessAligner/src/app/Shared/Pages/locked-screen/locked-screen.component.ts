import { Component } from "@angular/core";
import { HelpLinkComponent } from "../../Elements/help-link/help-link.component";
import { BackHomeComponent } from "../../Elements/back-home/back-home.component";
import { TranslateModule } from "@ngx-translate/core";
import { SearchComponent } from "../../Elements/search/search.component";

@Component({
  selector: "app-locked-screen",
  standalone: true,
  imports: [
    HelpLinkComponent,
    BackHomeComponent,
    TranslateModule,
    SearchComponent,
  ],
  templateUrl: "./locked-screen.component.html",
  styleUrl: "./locked-screen.component.css",
})
export class LockedScreenComponent {}
