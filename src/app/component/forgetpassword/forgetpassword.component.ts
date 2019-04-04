import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { HttputilService } from 'src/app/core/services/httputil.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  forgotForm: FormGroup;
  loading = false;
submitted = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private userService: UserService,
private httpUtil: HttputilService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      emailId: ['', Validators.required]
});
  }

  get f() { return this.forgotForm.controls; }

  onSubmit(user) {
    this.submitted = true;

    if (this.forgotForm.invalid) {
      return;
    }
    this.userService.forgotPassword(user).subscribe(response => {
      this.snackBar.open("open your email to reset password", "Ok", { duration: 2000 })
    }, error => {
      this.snackBar.open("error", "please enter the registered email", { duration: 2000 })
    });
}

}
