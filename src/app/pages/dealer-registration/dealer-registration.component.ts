import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-dealer-registration',
  templateUrl: './dealer-registration.component.html',
  styleUrls: ['./dealer-registration.component.css']
})
export class DealerRegistrationComponent implements OnInit, AfterViewInit {
  regForm1: FormGroup;
  regForm3: FormGroup;
  regForm2: FormGroup;
  isCompleted1:boolean = true;
  isCompleted2:boolean = true;
  isCompleted3:boolean = true;
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
  selectedCompanyLogoPath: any;
  selectedUserImgPath: any;
  selectedUserImg: File;
  alertMsg: any = {
    type: '',
    message: ''
  };
  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;
  constructor(
    private _formBuilder: FormBuilder,
    private dataService: InitialDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataService.getIndustries().subscribe(data => {
      this.industries = data.response.industryList;
    });
    this.dataService.getCountries().subscribe(data => {
      this.countries = data.response.countryList;
    });
    this.regForm1 = this._formBuilder.group({
      companyName: [null, Validators.required],
      industryId: [null, Validators.required],
      companyEmail: ['', [Validators.required, Validators.email]],
      companyPhone: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: [null, Validators.required],
      personalEmail:  ['', [Validators.required, Validators.email]],
      personalPhone: ['', Validators.required],
    });
    this.regForm2 = this._formBuilder.group({
      companyLogo: [null, Validators.required],
      userLogo: [null, Validators.required],
    });
    this.regForm3 = this._formBuilder.group({
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      city: ['', Validators.required],
      countryId: [null, Validators.required],
      stateId: [null, Validators.required],
      zipCode: ['', Validators.required],
      mapLocations: [null]
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

  onFileChanged(event: any, type: string) {
    const reader = new FileReader();
    if (type == 'company') {
      this.selectedCompanyLogo = event.target.files[0];
      reader.readAsDataURL(this.selectedCompanyLogo);
      reader.onload = (_event) => {
        this.selectedCompanyLogoPath = reader.result;
      }
    } else if (type == 'user') {
      this.selectedUserImg = event.target.files[0];
      reader.readAsDataURL(this.selectedUserImg);
      reader.onload = (_event) => {
        this.selectedUserImgPath = reader.result;
      }
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
  close() {
    this.alertMsg.message = ''
  }
  submit(){
    console.log(this.regForm1.value);
    console.log(this.regForm2.value);
    localStorage.setItem('personalPhone', this.regForm1.value.personalPhone);
    let formObj = {...this.regForm1.value, ...this.regForm3.value};
    formObj.mapLocations = [{lat:"12.11",lng:"12.13"},{lat:"12.45",lng:"12.4643"}];
    if(this.regForm3.valid){
      let formData = new FormData();
      formData.append('data', JSON.stringify(formObj));
      formData.append('userPhoto', this.selectedUserImg);
      formData.append('companyLogo', this.selectedCompanyLogo);
      this.dataService.registerDealer(formData).subscribe(res =>{
        console.log(res);
        if (res.responseCode == 0) {
          this.router.navigateByUrl("/verify");
        }
        else if (res.responseCode == -1) {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = res.errorMsg
        } else {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = 'Server error'
        }
      });
    }
    
  }
}
