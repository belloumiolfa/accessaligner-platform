import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: "./layout.component.html",
  styleUrl: "./layout.component.css",
})
export class LayoutComponent {}
