import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  isLoading = false;
  form: UntypedFormGroup;
  accountInfo;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.form = new UntypedFormGroup({
      email: new UntypedFormControl(null, { validators: [Validators.required] })
    });
  }

  onResetPassword() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.resetPassword(this.form.value.email)
  }
}
