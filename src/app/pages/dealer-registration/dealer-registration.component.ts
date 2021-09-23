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
  secondFormGroup: FormGroup;
  isEditable = true;
  industries = [];
  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;
  constructor(
    private _formBuilder: FormBuilder,
    private dataService: InitialDataService
  ) { }

  ngOnInit(): void {
    this.dataService.getIndustries().subscribe(data => {
      this.industries = data.response.industryList;
    })
    this.regForm1 = this._formBuilder.group({
      industry: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.stepper._getIndicatorType = () => 'none';
  }
}
