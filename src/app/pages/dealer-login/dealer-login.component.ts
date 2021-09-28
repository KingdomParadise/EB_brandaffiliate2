import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dealer-login',
  templateUrl: './dealer-login.component.html',
  styleUrls: ['./dealer-login.component.css']
})
export class DealerLoginComponent implements OnInit {
  login: FormGroup;
  constructor(
    private router: Router,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.login = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  goToNextPage(){
    this.router.navigateByUrl('/dealer-forgot-password')
  }
}
