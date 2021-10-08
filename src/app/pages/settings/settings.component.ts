import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InitialDataService } from 'src/app/services/initial-data.service';
import { ChangePasswordModalComponent } from './change-password-modal/change-password-modal.component';

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

  facebookLink:string;
  linkedinLink:string;
  instaLink:string;
  selectedCompanyLogo: File;
  selectedUserImg: File;
  selectedCompanyLogoPath:any = 'assets/images/profile-pic.png';
  selectedUserImgPath:any = 'assets/images/profile-pic.png';

  constructor(
    private _formBuilder: FormBuilder,
    private dataService: InitialDataService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    console.log(this.userData);
    this.selectedCompanyLogoPath = this.userData.companyLogoUrl;
    this.selectedUserImgPath = this.userData.userPhotoUrl;
    this.facebookLink = this.userData.facebookLink;
    this.linkedinLink = this.userData.linkedinLink;
    this.instaLink = this.userData.instaLink;
    this.dataService.getIndustries().subscribe(data => {
      this.industries = data.response.industryList;
    });
    this.dataService.getCountries().subscribe(data => {
      this.countries = data.response.countryList;
    });
    
    this.profileForm = this._formBuilder.group({
      addressLine1: [this.userData.addressLine1, Validators.required],
      addressLine2: [this.userData.addressLine2, Validators.required],
      city: [this.userData.city, Validators.required],
      countryId: [this.userData.countryId, Validators.required],
      stateId: [this.userData.stateId, Validators.required],
      zipCode: [this.userData.zipCode, Validators.required],
      companyEmail: [this.userData.companyEmail, [Validators.required, Validators.email]],
      companyPhone: [this.userData.companyPhone, Validators.required],
      personalEmail: [this.userData.emailId, [Validators.required, Validators.email]],
      personalPhone: [this.userData.phoneNumber, Validators.required],
    });
    this.onCountrySelect(this.userData.countryId);
  }

  onCountrySelect(country: any) {
    if (country) {
      if(typeof country == 'number'){
        this.dataService.getStates(country).subscribe(data => {
          this.states = data.response.stateList;
        })
      }else{
        this.dataService.getStates(country.countryId).subscribe(data => {
          this.states = data.response.stateList;
        })
      }
    }
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
  submit() {

  }
  close() {
    this.alertMsg.message = ''
  }
  openChangePasswordDialog(){
    let size = ['375px','375'];
    if(window.innerWidth > 786){
      size = ['475px','400px'];
    }else{
      size = ['350px','400px'];
    }
    const dialogRef = this.dialog.open(ChangePasswordModalComponent, {
      maxWidth: size[0],
      maxHeight: size[1],
      height: '100%',
      width: '100%',
      data: "h",
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      //this.animal = result;
    });
  }

  updateChanges(){
    if(this.profileForm.valid){
      //update socila info
      let obj = {
        facebookLink: this.facebookLink,
        linkedinLink: this.linkedinLink,
        instaLink: this.instaLink
      }
      this.dataService.updateDealerSocialInfo(obj).subscribe( res1 =>{
        if (res1.responseCode == -1) {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = res1.errorMsg
          //this.router.navigateByUrl('/review', { state: { msg: res.successMsg } });
        }else if(res1.responseCode == 0){
          this.alertMsg.type = 'success';
          this.alertMsg.message = res1.successMsg
        }else{
          this.alertMsg.type = 'danger';
          this.alertMsg.message = "Server error"
        }
      })
      //update profile info
      let formData = new FormData();
      formData.append('data', JSON.stringify(this.profileForm.value));
      formData.append('userPhoto', this.selectedUserImg);
      formData.append('companyLogo', this.selectedCompanyLogo);
      this.dataService.updateDealerSettings(formData).subscribe( res =>{
        console.log(res);
        if (res.responseCode == -1) {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = res.errorMsg
          //this.router.navigateByUrl('/review', { state: { msg: res.successMsg } });
        } else if (res.responseCode == 0) {
          this.alertMsg.type = 'success';
          this.profileForm.patchValue(res.response);
          localStorage.setItem('userData', JSON.stringify(res.response));
          this.alertMsg.message = res.successMsg;
        } else {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = "Server error"
        }
      })
    }
  }
}


