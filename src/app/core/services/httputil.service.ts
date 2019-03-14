import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttputilService {

  constructor(private http: HttpClient) { }


  postService(url, object): any {
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
  postWithBody(url,object,header){
    return this.http.post<any>(url,object,header);
  }

  postWithUpdate(url,object,header){
    return this.http.post<any>(url,object,header);
  }
  
  labelUpdateService(url,object,header){
    return this.http.put<any>(url,object,header);
  }

 

  labelCreateService(url,object,header){
    return this.http.post<any>(url,object,header);
}
}