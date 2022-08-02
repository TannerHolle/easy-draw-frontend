import { Component, OnInit, HostListener } from '@angular/core';
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
  }

  //This makes it so the local storage (login info) is cleared when they exit browser or tab
  // @HostListener("window:beforeunload",["$event"])
  // clearLocalStorage(event){
  //     localStorage.clear();
  // }

}
