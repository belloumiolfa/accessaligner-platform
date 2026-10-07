import { Component } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { CommonModule } from "@angular/common";
import { links } from "../../Static Data/socialMediaLinks";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-links",
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: "./links.component.html",
  styleUrl: "./links.component.css",
})
export class LinksComponent {
  domain: String = environment.domainName;
  links = links;
}
