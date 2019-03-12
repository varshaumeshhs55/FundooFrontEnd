import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';

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
    private router: Router) {

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
    this.userservice.login(user);
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log("Invalid");
    }
console.log(user);

  }
}
