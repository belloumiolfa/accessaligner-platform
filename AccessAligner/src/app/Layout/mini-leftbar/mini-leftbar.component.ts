import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { OverlayMenuComponent } from "../overlay-menu/overlay-menu.component";
import { MenuAppComponent } from "../menu-app/menu-app.component";
import { NotifMenuComponent } from "../notif-menu/notif-menu.component";
import { TaskMenuComponent } from "../task-menu/task-menu.component";
import { RigthSidebarComponent } from "../rigth-sidebar/rigth-sidebar.component";
import { LeftSidebarMobilComponent } from "../left-sidebar-mobil/left-sidebar-mobil.component";
import { Router, RouterModule } from "@angular/router";
import { AppService } from "../../Core/Services/app.service";
import { TranslateButtonComponent } from "../../Shared/Elements/translate-button/translate-button.component";
import { AuthService } from "../../Core/Services/AuthService/auth.service";

@Component({
  selector: "app-mini-leftbar",
  standalone: true,
  imports: [
    CommonModule,
    OverlayMenuComponent,
    MenuAppComponent,
    NotifMenuComponent,
    TaskMenuComponent,
    RigthSidebarComponent,
    LeftSidebarMobilComponent,
    RouterModule,
    TranslateButtonComponent,
  ],
  templateUrl: "./mini-leftbar.component.html",
  styleUrl: "./mini-leftbar.component.css",
})
export class MiniLeftbarComponent {
  search = false;
  app = false;
  notif = false;
  task = false;
  activity = false;
  mobile = false;
  user$: any;

  constructor(
    private router: Router,
    private appService: AppService,
    private authService: AuthService
  ) {
    this.appService.getUser$.subscribe((data) => (this.user$ = data));
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(["/sign-in"]);
  }

  closeMenus() {
    this.search = false;
    this.app = false;
    this.notif = false;
    this.task = false;
    this.activity = false;
    this.mobile = false;
  }
}
