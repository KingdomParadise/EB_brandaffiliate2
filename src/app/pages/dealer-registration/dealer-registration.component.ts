import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-dealer-registration',
  templateUrl: './dealer-registration.component.html',
  styleUrls: ['./dealer-registration.component.css']
})
export class DealerRegistrationComponent implements OnInit, AfterViewInit {
  regForm1: FormGroup;
  regForm3: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = true;
  industries = [];
  countries = [];
  states = [];
  isLinear = true;
  currentStepperImage= 'assets/images/main-image.png';
  stepperImages = [
    {
      url: 'assets/images/main-image.png'
    },
    {
      url: 'assets/images/stepper2image.png'
    },
    {
      url: 'assets/images/stepper3image.png'
    }
  ];
  selectedCompanyLogo: File;
  selectedUserImg: File;
  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;
  constructor(
    private _formBuilder: FormBuilder,
    private dataService: InitialDataService
  ) { }

  ngOnInit(): void {
    this.dataService.getIndustries().subscribe(data => {
      this.industries = data.response.industryList;
    });
    this.dataService.getCountries().subscribe(data => {
      this.countries = data.response.countryList;
    });
    this.regForm1 = this._formBuilder.group({
      industry: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      zipcode: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.regForm3 = this._formBuilder.group({
      companyEmail: ['', Validators.required],
      companyPhone: ['', Validators.required],
      personalEmail: ['', Validators.required],
      personalPhone: ['', Validators.required]
    });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });
  }

  ngAfterViewInit() {
    this.stepper._getIndicatorType = () => 'none';
  }

  public onStepChange(event: any): void {
    console.log(event.selectedIndex);
    this.currentStepperImage= this.stepperImages[event.selectedIndex].url;
  }

  onFileChanged(event:any, type:string){
    if(type == 'company'){
      this.selectedCompanyLogo = event.target.files[0];
    }else if(type == 'user'){
      this.selectedUserImg = event.target.files[0];
    }
  }

  onCountrySelect(country:any){
    console.log(country);
    if(country){
      this.dataService.getStates(country.countryId).subscribe(data =>{
        this.states = data.response.stateList;
      })
    }
  }
  submit(){

  }
}
