import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dealer-complete-profile',
  templateUrl: './dealer-complete-profile.component.html',
  styleUrls: ['./dealer-complete-profile.component.css']
})
export class DealerCompleteProfileComponent implements OnInit {
  completeProfile: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.completeProfile = this._formBuilder.group({
      companyFb: ['', Validators.required],
      companyInsta: ['', Validators.required],
      companyLinkedin: ['', Validators.required]
    });
  }
  goToNextPage(){
    this.router.navigateByUrl('/dealer-package');
  }
}
