import { Component } from "@angular/core";
import { HelpLinkComponent } from "../help-link/help-link.component";
import { environment } from "../../../../environments/environment.development";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-back-home",
  standalone: true,
  imports: [HelpLinkComponent, TranslateModule],
  templateUrl: "./back-home.component.html",
  styleUrl: "./back-home.component.css",
})
export class BackHomeComponent {
  domain: String = environment.domainName;
}
