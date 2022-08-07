import { Component, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms"
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  isLoading = false;
  passwordValidations = {
    uppercaseLetter: false,
    lowercaseLetter: false,
    aNumber: false,
    minimumEightChars: false
  }
  @ViewChild('signupForm') signupForm: NgForm;

  constructor(public authService: AuthService) { }

  onPasswordChange(value) {
    const lowerCaseLetters = /[a-z]/g;
    if (value.match(lowerCaseLetters)) {
      this.passwordValidations.lowercaseLetter = true;
    } else {
      this.signupForm.form.controls['password'].setErrors({ 'incorrect': true });
      this.passwordValidations.lowercaseLetter = false;
    }

    // Validate capital letters
    const upperCaseLetters = /[A-Z]/g;
    if (value.match(upperCaseLetters)) {
      this.passwordValidations.uppercaseLetter = true;
    } else {
      this.signupForm.form.controls['password'].setErrors({ 'incorrect': true });
      this.passwordValidations.uppercaseLetter = false;
    }

    // Validate numbers
    const numbers = /[0-9]/g;
    if (value.match(numbers)) {
      this.passwordValidations.aNumber = true;
    } else {
      this.signupForm.form.controls['password'].setErrors({ 'incorrect': true });
      this.passwordValidations.aNumber = false;
    }

    // Validate length
    if (value.length >= 8) {
      this.passwordValidations.minimumEightChars = true;
    } else {
      this.signupForm.form.controls['password'].setErrors({ 'incorrect': true });
      this.passwordValidations.minimumEightChars = false;
    }
  }

  onSignUp(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (form.value.password !== form.value.confirmPassword) {
      alert('Passwords do not match')
      return false;
    }

    this.isLoading = true;
    this.authService.createUser(form.value.name, form.value.company, form.value.email, form.value.password)
  }

}
