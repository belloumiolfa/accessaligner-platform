import { Component, Input } from "@angular/core";
import { LogoComponent } from "../../Shared/Elements/logo/logo.component";
import { LinksComponent } from "../../Shared/Elements/links/links.component";
import { environment } from "../../../environments/environment.development";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-company-details",
  standalone: true,
  imports: [LogoComponent, LinksComponent, TranslateModule],
  templateUrl: "./company-details.component.html",
  styleUrl: "./company-details.component.css",
})
export class CompanyDetailsComponent {}
