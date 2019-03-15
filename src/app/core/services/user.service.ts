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
  login(user) {
   return this.httpUtil.postService(environment.user_url + 'loginuser', user);

  }

  register(user) {
  return this.httpUtil.postService(environment.user_url+'registeruser', user)}
  
  forgotPassword(user) {
    return this.httpUtil.postService(environment.user_url + 'forgotpassword', user);
  }


resetPassword(user, id) {
  return this.httpUtil.putService(environment.user_url + 'resetpassword/'+id, user, id);
}}