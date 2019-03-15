import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  hide = true;

  constructor(private formBuilder: FormBuilder,
    private userservice:UserService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailId: ['', Validators.required],
      password: ['', Validators.required]
    });


  }


  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit(user) {
    this.submitted = true;
    this.userservice.login(user).subscribe(response => {
      // if (response.status == 200) {
       console.log("Logged in ")
       localStorage.setItem('token',response.headers.get('token'));
        console.log(response.headers.get('token'))
         this.router.navigate(['./home']);
       
      // }
      // else {
      //   console.log("Couldnt log in");
      // }
    },error => {
      console.log(error)
      this.snackBar.open("error", "Coudnt log in", { duration: 2000 })
    });
    
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log("Invalid");
    }
console.log(user);

  }
}
