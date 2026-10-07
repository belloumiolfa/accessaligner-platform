import { Component } from "@angular/core";
import { environment } from "../../../../environments/environment.development";

@Component({
  selector: "app-logo",
  standalone: true,
  imports: [],
  templateUrl: "./logo.component.html",
  styleUrl: "./logo.component.css",
})
export class LogoComponent {
  name = environment.companyName;
  domain = environment.domainName;
}
