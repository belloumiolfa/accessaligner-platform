import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CompanyDetailsComponent } from "../../Auth/company-details/company-details.component";
import { TranslateButtonComponent } from "../../Shared/Elements/translate-button/translate-button.component";

@Component({
  selector: "app-public-layout",
  standalone: true,
  imports: [RouterModule, CompanyDetailsComponent, TranslateButtonComponent],
  templateUrl: "./public-layout.component.html",
  styleUrl: "./public-layout.component.css",
})
export class PublicLayoutComponent {}
