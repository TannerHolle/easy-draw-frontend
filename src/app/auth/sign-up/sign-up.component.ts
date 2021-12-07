import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms"
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }


  onSignUp(form: NgForm){
    if (form.invalid) {
      return;
    }
    this.authService.createUser(form.value.email, form.value.password).subscribe((response: any) => {
    });
  }




}
