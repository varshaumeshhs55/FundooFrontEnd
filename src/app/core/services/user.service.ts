import { Injectable } from '@angular/core';
import { HttputilService } from './httputil.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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