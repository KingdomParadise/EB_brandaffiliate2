import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  profileForm: FormGroup;
  industries: any;
  countries: any;
  states: any;
  alertMsg: any = {
    type: '',
    message: ''
  };
  userData:any;
  constructor(
    private _formBuilder: FormBuilder,
    private dataService: InitialDataService
  ) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');

    this.dataService.getIndustries().subscribe(data => {
      this.industries = data.response.industryList;
    });
    this.dataService.getCountries().subscribe(data => {
      this.countries = data.response.countryList;
    });

    this.profileForm = this._formBuilder.group({
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      city: ['', Validators.required],
      countryId: [null, Validators.required],
      stateId: [null, Validators.required],
      zipCode: ['', Validators.required],
      companyEmail: ['', [Validators.required, Validators.email]],
      companyPhone: ['', Validators.required],
      personalEmail: ['', [Validators.required, Validators.email]],
      personalPhone: ['', Validators.required],
    });
  }

  onCountrySelect(country: any) {
    console.log(country);
    if (country) {
      this.dataService.getStates(country.countryId).subscribe(data => {
        this.states = data.response.stateList;
      })
    }
  }
  submit() {

  }
  close() {
    this.alertMsg.message = ''
  }
}
