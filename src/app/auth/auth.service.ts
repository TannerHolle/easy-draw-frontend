import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WebRequestService } from "../services/web-request.service";


@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private webReqService: WebRequestService) {}


  createUser(email: string, password: string) {
    return this.webReqService.post('user/sign-up', {
      "email": email,
      "password": password,
    })
  }

  login(email:string, password:string) {
    return this.webReqService.post('user/login', {
      "email": email,
      "password": password,
    })
  }



}
