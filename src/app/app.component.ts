import { Component, OnInit } from '@angular/core';
import { environment } from "../environments/environment";
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoAuthUser()
    console.log(environment.apiUrl)
  }

}
