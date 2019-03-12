import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttputilService {

  constructor(private http: HttpClient) { }


  postService(url, object) {
    return this.http.post<any>(url, object, { observe: "response" });
  }


  putService(url, object, Headers) {
    return this.http.put<any>(url, object, Headers);
  }

  getService(url, Headers) {
    return this.http.get<any>(url, Headers);
  }

  deleteService(url, Headers) {
    return this.http.delete<any>(url, Headers);
  }
}



