import { Component, Input } from '@angular/core';
import { AuthService } from '../../Core/Services/AuthService/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { AdminService } from '../../Core/Services/AdminService/admin.service';

@Component({
  selector: 'app-accept-form',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './accept-form.component.html',
  styleUrl: './accept-form.component.css',
})
export class AcceptFormComponent {
  @Input() userId!: any;
  @Input() adminId!: any;

  errors: any;
  constructor(
     private adminService: AdminService,
  ) {}

  onAccept(userId: any) {
    this.adminService.approveUser(userId);
  }

  onReject(userId: any) {
    this.adminService.rejectUser(userId, 'User rejected');
  }
}
