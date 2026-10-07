import { Component } from "@angular/core";
import { OtakComponent } from "../../Shared/Elements/otak/otak.component";
import { HeartComponent } from "../../Shared/Elements/heart/heart.component";

@Component({
  selector: "app-hero",
  standalone: true,
  imports: [OtakComponent, HeartComponent],
  templateUrl: "./hero.component.html",
  styleUrl: "./hero.component.css",
})
export class HeroComponent {}
