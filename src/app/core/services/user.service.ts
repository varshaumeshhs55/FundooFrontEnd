import { Injectable } from '@angular/core';
import { HttputilService } from './httputil.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public token = localStorage.getItem('token');
  public httpheaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.token
    })
};

  constructor(private httpUtil: HttputilService,private router:Router) { }
  login(user) :Observable<any>{
   return this.httpUtil.postService(environment.user_url + 'loginuser', user);

  }

  register(user) {
  return this.httpUtil.postService(environment.user_url+'registeruser', user)}
  
  forgotPassword(user) {
    return this.httpUtil.postService(environment.user_url + 'forgotpassword', user);
  }
  uploadImage(file): Observable<any> {
    const formdata = new FormData();
    formdata.append("file", file);
    return this.httpUtil.postToUploadImage(environment.user_url + 'photo/' + this.token, formdata, {
      reportProgress: true,
      responseType: 'text'
    }
    );
  }

  downloadImage():Observable<any> {
    return this.httpUtil.getService(environment.user_url + 'photo', this.httpheaders);
  }

  removeImage()
  {
    return this.httpUtil.deleteService(environment.user_url + 'photo',this.httpheaders);
}


resetPassword(user, id) {
  return this.httpUtil.putService(environment.user_url + 'resetpassword/'+id, user, id);
}}