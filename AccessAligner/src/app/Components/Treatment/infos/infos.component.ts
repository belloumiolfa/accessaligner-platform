import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TreatGeneralComponent } from "../treat-general/treat-general.component";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-infos",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TreatGeneralComponent,
    TranslateModule,
  ],
  templateUrl: "./infos.component.html",
  styleUrl: "./infos.component.css",
})
export class InfosComponent {
  show = false;
  @Input() treatment$: any;
  @Input() detailsTreat!: boolean;
}
