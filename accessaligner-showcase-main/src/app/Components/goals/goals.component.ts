import { Component } from "@angular/core";
import { OtakComponent } from "../../Shared/Elements/otak/otak.component";
import { EyeComponent } from "../../Shared/Elements/eye/eye.component";
import { FlagComponent } from "../../Shared/Elements/flag/flag.component";

@Component({
  selector: "app-goals",
  standalone: true,
  imports: [OtakComponent, EyeComponent, FlagComponent],
  templateUrl: "./goals.component.html",
  styleUrl: "./goals.component.css",
})
export class GoalsComponent {}
