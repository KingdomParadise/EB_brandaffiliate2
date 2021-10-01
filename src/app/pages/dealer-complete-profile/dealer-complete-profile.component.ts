import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-dealer-complete-profile',
  templateUrl: './dealer-complete-profile.component.html',
  styleUrls: ['./dealer-complete-profile.component.css']
})
export class DealerCompleteProfileComponent implements OnInit {
  completeProfile: FormGroup;
  alertMsg: any = {
    type: '',
    message: ''
  };
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private dataService: InitialDataService,
    ) { }

  ngOnInit(): void {
    this.completeProfile = this._formBuilder.group({
      facebookLink: ['', Validators.required],
      instaLink: ['', Validators.required],
      linkedinLink: ['', Validators.required]
    });
  }
  close(){
    this.alertMsg.message = '';
  }
  submit(){
    if(this.completeProfile.value){
      this.dataService.updateDealerSocialInfo(this.completeProfile.value).subscribe( res =>{
        if (res.responseCode == 0) {
          this.alertMsg.type = 'success';
          this.alertMsg.message = res.successMsg;
          this.router.navigateByUrl('/dashboard');
        }else if( res.responseCode == -1){
          this.alertMsg.type = 'danger';
          this.alertMsg.message = res.errorMsg;
        }else{
          this.alertMsg.type = 'danger';
          this.alertMsg.message = "Server error"
        }
      })
    }
  }
}
