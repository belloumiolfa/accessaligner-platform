import { Component } from "@angular/core";
import { BackHomeComponent } from "../../Shared/Elements/back-home/back-home.component";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-waiting",
  standalone: true,
  imports: [BackHomeComponent, TranslateModule],
  templateUrl: "./waiting.component.html",
  styleUrl: "./waiting.component.css",
})
export class WaitingComponent {}
