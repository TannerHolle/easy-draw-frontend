import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WebRequestService } from "../services/web-request.service";
import { environment } from "../../environments/environment";
import { Subject } from "rxjs";
import { Router } from "@angular/router";



@Injectable({ providedIn: 'root' })
export class AuthService {

  private token: string;
  private tokenTimer: any;
  private isAuthenticated = false;
  public authStatusListener = new Subject<boolean>();

  constructor(private webReqService: WebRequestService, private router: Router, private http: HttpClient) {}

  getToken() {
    return this.token;
  }

  setToken(token) {
    this.token = token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    return this.webReqService.post('user/sign-up', {
      "email": email,
      "password": password,
    })
  }

  login(email:string, password:string) {
    const authData = { "email": email, "password": password }
    this.http.post(environment.apiUrl + '/user/login', authData)
    .subscribe(response => {
      const token = response['token'];
      this.token = token;
      if (token) {
        const expiresInDuration = response['expiresIn'];
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        console.log(expirationDate);
        this.saveAuthData(token, expirationDate);
        this.router.navigate(["/"]);
      }
    });
    // return this.webReqService.post('user/login', {
    //   "email": email,
    //   "password": password,
    // })
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/home"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }


}
