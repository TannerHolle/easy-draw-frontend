import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = environment.apiUrl;
   }

   get(uri: string) {
     return this.http.get(`${this.ROOT_URL}/${uri}`);
   }

   getImages(uri: string) {
     return this.http.get(`${this.ROOT_URL}/${uri}`, {responseType: 'blob'});
   }

   post(uri: string, payload: Object) {
     return this.http.post(`${this.ROOT_URL}/${uri}`, payload, {responseType: 'text'});
   }

   postImages(uri: string, payload: Object) {
     return this.http.post(`${this.ROOT_URL}/${uri}`, payload, {responseType: 'blob'});
   }

   postInvoice(uri: string, payload: FormData) {
     return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
   }

   patch(uri: string, payload: Object) {
     return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
   }

   delete(uri: string) {
     return this.http.delete(`${this.ROOT_URL}/${uri}`, {responseType: 'text'});
   }


}
