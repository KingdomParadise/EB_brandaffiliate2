import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dealer-forget-password',
  templateUrl: './dealer-forget-password.component.html',
  styleUrls: ['./dealer-forget-password.component.css']
})
export class DealerForgetPasswordComponent implements OnInit {
  forgotPassword: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.forgotPassword = this._formBuilder.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }
  goToNextPage(){
    this.router.navigateByUrl('/')
  }

}
