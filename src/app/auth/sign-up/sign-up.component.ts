import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms"
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  isLoading = false;


  constructor(public authService: AuthService) { }

  ngOnInit() {
  }


  onSignUp(form: NgForm){
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password)
  }




}
