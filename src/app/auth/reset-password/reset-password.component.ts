import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  isLoaded: boolean = false;
  form: UntypedFormGroup;
  secretId;
  message = 'Please wait while we verify link!';
  email;
  passwordValidations = {
    uppercaseLetter: false,
    lowercaseLetter: false,
    aNumber: false,
    minimumEightChars: false
  }

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      password: new UntypedFormControl(null, { validators: [Validators.required] }),
      confirmPassword: new UntypedFormControl(null, { validators: [Validators.required] }),
    });

    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.secretId = params['id'];
        console.log('this.secretId ', this.secretId)
        this.verifyLink(this.secretId);
      } else {
        this.message = "Invalid Link";
      }
    });
  }

  onPasswordChange(value) {
    const lowerCaseLetters = /[a-z]/g;
    if (value.match(lowerCaseLetters)) {
      this.passwordValidations.lowercaseLetter = true;
    } else {
      this.form.controls['password'].setErrors({ 'incorrect': true });
      this.passwordValidations.lowercaseLetter = false;
    }

    // Validate capital letters
    const upperCaseLetters = /[A-Z]/g;
    if (value.match(upperCaseLetters)) {
      this.passwordValidations.uppercaseLetter = true;
    } else {
      this.form.controls['password'].setErrors({ 'incorrect': true });
      this.passwordValidations.uppercaseLetter = false;
    }

    // Validate numbers
    const numbers = /[0-9]/g;
    if (value.match(numbers)) {
      this.passwordValidations.aNumber = true;
    } else {
      this.form.controls['password'].setErrors({ 'incorrect': true });
      this.passwordValidations.aNumber = false;
    }

    // Validate length
    if (value.length >= 8) {
      this.passwordValidations.minimumEightChars = true;
    } else {
      this.form.controls['password'].setErrors({ 'incorrect': true });
      this.passwordValidations.minimumEightChars = false;
    }
  }

  verifyLink(id) {
    this.http.post(environment.apiUrl + '/user/verify-reset-password-link', { id })
      .subscribe((response: any) => {
        if (response.type == 'success') {
          this.isLoaded = true;
          this.email = response.email;

          alert('Link Verified')
        } else {
          this.message = response.message;
        }
      },
        error => {
          this.message = 'Error';
        });
  }

  updatePassword() {
    if (this.form.invalid) {
      return;
    }
    if (this.email == undefined) {
      alert('Something went wrong')
      return false;
    }
    if (this.form.value.password == '') {
      return false;
    }
    if (this.form.value.confirmPassword == '') {
      return false;
    }

    if (this.form.value.password !== this.form.value.confirmPassword) {
      alert('Passwords do not match')
      return false;
    }

    this.http.post(environment.apiUrl + '/user/reset-password', { email: this.email, password: this.form.value.password }).subscribe((response: any) => {
      if (response.type == 'success') {
        alert(response.message)
        this.navigateToLogin();
      } else {
        alert(response.message);
      }
    }, err => {
      alert('Error')
    });
  }

  navigateToLogin() {
    this.router.navigate(['login'])
  }
}