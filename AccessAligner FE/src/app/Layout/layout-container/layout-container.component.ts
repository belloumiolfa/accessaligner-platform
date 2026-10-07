import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgbCollapseModule, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { MiniLeftbarComponent } from '../mini-leftbar/mini-leftbar.component';
import { LeftSidebarComponent } from '../left-sidebar/left-sidebar.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HandleErrorsService } from '../../Core/Helpers/handle-errors.service';
import { User } from '../../Core/Models/user.models';
import { AppService } from '../../Core/Services/app.service';
import { SafeUrl } from '@angular/platform-browser';

import { AuthRequestsService } from '../../Core/Requests/Auth/auth-requests.service';
import { MenuItem } from '../Shared/Models/menu.model';

@Component({
  selector: 'app-layout-container',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    AccordionModule,
    MiniLeftbarComponent,
    NgbCollapseModule,
    NgbDropdown,
    RouterModule,
    LeftSidebarComponent,
  ],
  templateUrl: './layout-container.component.html',
  styleUrl: './layout-container.component.css',
})
export class LayoutContainerComponent {
  showMobileMenu: boolean = true;

  menuItems: MenuItem[] = [];
  activeMenuItems: string[] = [];
  chunkSize: number = 7;
  div: HTMLElement | null | undefined;
  isCollapsed: any = true;

  user$!: User;
  profilePhoto$!: any;

  errors!: any;
  imageUrl!: SafeUrl;

  constructor(
    private authRequests: AuthRequestsService,
    private handleErrors: HandleErrorsService,
    private spinner: NgxSpinnerService,
    private appService: AppService,
  ) {
    this.appService.getUser$.subscribe((data) => (this.user$ = data));
  }

  ngOnInit(): void {
    this.spinner.show();
    this.authRequests
      .getCurrentUser()
      .subscribe(
        (data) => {
          this.spinner.hide();
          this.appService.setUser$(data);
        },
        (err) => {
          this.spinner.hide();
          this.errors = this.handleErrors.handleError(err);
        },
      );
  }
}
