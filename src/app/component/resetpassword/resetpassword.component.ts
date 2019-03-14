import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { HttputilService } from 'src/app/core/services/httputil.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  resetForm: FormGroup;
  loading = false;
  submitted = false;
  public id = this.route.snapshot.params.id;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private userService: UserService,
    private httpUtil: HttputilService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(4)]]
    });
  }
  get f() { return this.resetForm.controls; }

  onSubmit(user) {
    this.submitted = true;

    if (this.resetForm.invalid) {
      return;
    }
    if (this.resetForm.value.password != this.resetForm.value.confirmpassword) {
      this.snackBar.open("failed", "both password should be same", {
        duration: 2000
      });
      return;
    }
    console.log(user);
    this.userService.resetPassword(user, this.id).subscribe(response => {
      this.router.navigate(['/login']);
      this.snackBar.open("sucess", "password reset successfully", {
        duration: 2000
      });
      console.log("reset successful", response);
    },
      error => {
        this.snackBar.open("error", "error to reset", { duration: 2000 });
        console.log("error to reset", error);
      }
    );
  }

}

