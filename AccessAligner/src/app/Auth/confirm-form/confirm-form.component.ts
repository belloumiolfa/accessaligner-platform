import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../Core/Models/user.models';
import { AuthService } from '../../Core/Services/AuthService/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { AdminService } from '../../Core/Services/AdminService/admin.service';

@Component({
  selector: 'app-confirm-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './confirm-form.component.html',
  styleUrl: './confirm-form.component.css',
})
export class ConfirmFormComponent {
  @Input() user!: any;
  @Input() token!: any;
  @Output() updatedUser$ = new EventEmitter<any>();

  confirmForm!: FormGroup;
  errors: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
    this.confirmForm = this.formBuilder.group({
      term: new FormControl('', [Validators.required]),
    });
  }

  /*   onSubmit(status: string, userId: any) {
    this.authService.UpdateStatus(userId, status, null);
  }
 */
  onConfirm(token: string) {
    this.authService.confirmRegistration(token);
  }

  onCancel(token: string) {
    this.authService.cancelRegistration(token);
  }
}
