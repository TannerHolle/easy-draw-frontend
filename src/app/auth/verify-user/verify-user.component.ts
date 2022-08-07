import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent implements OnInit {
  message = "Please wait while we verify your email";

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.verifyEmail(params['id'])
      } else {
        this.message = "Invalid Link";
      }
    });
  }

  verifyEmail(id) {
    this.http.post(environment.apiUrl + '/user/verify-user-link', { id }).subscribe((response: any) => {
      if (response.type == 'success') {
        this.message = 'Link Verified';
      }
      setTimeout(() => {
        this.navigateToLogin();
      }, 1000 * 2)
    }, err => {
      this.message = "There was an error";
    });
  }

  navigateToLogin() {
    this.router.navigate(['login'])
  }
}
