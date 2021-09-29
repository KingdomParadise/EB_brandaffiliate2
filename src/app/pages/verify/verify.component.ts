import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit{
  otpForm: FormGroup;
  constructor(public router: Router, public _formBuilder:FormBuilder){

  }
  ngOnInit(){
    this.otpForm = this._formBuilder.group({
      otp: [null, Validators.required],
    });
  }
  onSubmit(){
    this.router.navigateByUrl('/review');
  }
}
