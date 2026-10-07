import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { SecurityFormComponent } from "../../Components/User Account/security-form/security-form.component";
import { AccountFormComponent } from "../../Components/User Account/account-form/account-form.component";
import { PhotoFormComponent } from "../../Components/User Account/photo-form/photo-form.component";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-rigth-sidebar",
  standalone: true,
  imports: [
    CommonModule,
    SecurityFormComponent,
    AccountFormComponent,
    PhotoFormComponent,
    TranslateModule,
  ],
  templateUrl: "./rigth-sidebar.component.html",
  styleUrl: "./rigth-sidebar.component.css",
})
export class RigthSidebarComponent {
  @Input() action!: any;
  actSet: any = true;
}
