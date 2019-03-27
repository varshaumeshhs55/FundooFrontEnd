import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  hide = true;

  constructor(private formBuilder: FormBuilder, private userservice: UserService,
    private router: Router,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      emailId: ['', [Validators.required, Validators.pattern('^[a-z0-9._%-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  get f() { return this.registerForm.controls; }
  onSubmit(user) {
    this.submitted = true;
      // stop here if form is invalid
      if (this.registerForm.invalid) {
        return;
      }
      this.userservice.register(user).subscribe(response => {
        this.router.navigate(['/login']);
      }, error => {
        this.snackBar.open("error", "cannot register", { duration: 2000 })
      });
  
    }
  
  }