import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  isLoading = false;
  form: FormGroup;
  accountInfo;



  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required] }),
      securityAnswer: new FormControl(null, { validators: [Validators.required] }),
      newPassword: new FormControl(null, { validators: [Validators.required] })
    });
  }


  onResetPassword(){
    if (this.form.invalid) {
      return;
    }
    if (this.accountInfo[0].securityAnswer.toLowerCase().trim() == this.form.value.securityAnswer.toLowerCase().trim()) {
      this.isLoading = true;
      this.authService.resetPassword(this.form.value.email, this.form.value.newPassword)
    } else {
      window.alert("Your Security Answer doesnt match what we have saved. If you believe this is a mistake, please contact us at (509) 851 8431")
    }
  }

  getInfoOnAccount(email) {
    this.authService.getAccountInfo(email).subscribe((result) => {
      console.log(result)
      if (result == '[]') {
        window.alert("Please enter a valid email address");
      } else {
        this.accountInfo = JSON.parse(result)
      }

    });
  }


}
