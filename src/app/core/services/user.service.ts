import { Injectable } from '@angular/core';
import { HttputilService } from './httputil.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httputil: HttputilService,private router:Router) { }
  login(user) {
    this.httputil.postService(environment.base_url + 'loginuser', user).subscribe(response => {
      if (response.status == 200) {
        console.log("Logged in ")
        localStorage.setItem('Authorization', response.headers.get('token'));
        this.router.navigate(['./home']);
       
      }
      else {
        console.log("Couldnt log in");
      }
    });
  }

  register(user) {
    this.httputil.postService(environment.base_url+'registeruser', user).subscribe(response => {
      console.log(response);
      if (response.status == 200) {
        console.log(response.body.header);
        localStorage.setItem('Authorization', response.body.headers);
        this.router.navigate(['./login']);
      }
      else {
        console.log(response.body.headers);
      }
    })
  }
}