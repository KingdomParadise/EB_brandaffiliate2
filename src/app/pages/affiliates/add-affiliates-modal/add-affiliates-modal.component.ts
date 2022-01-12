import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { atLeastOne } from 'src/app/services/eitherOne-validation';
import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-add-affiliates-modal',
  templateUrl: './add-affiliates-modal.component.html',
  styleUrls: ['./add-affiliates-modal.component.css']
})
export class AddAffiliatesModalComponent implements OnInit {

  customerForm: FormGroup;
  alertMsg: any = {
    type: '',
    message: ''
  };
  constructor(
    private dataService: InitialDataService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    @Optional() public dialogRef: MatDialogRef<AddAffiliatesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.customerForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      customerEmailId: ['', [ Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      customerPhoneNumber: ['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    },{ validator: atLeastOne(Validators.required, ['customerEmailId','customerPhoneNumber']) });
    if (this.data.mode == 'edit') {
      this.customerForm.patchValue(this.data.customer);
    }
  }
  customValidationFunction(formGroup:any): any {
    let nameField = formGroup.controls['name'].value; //access any of your form fields like this
    return (nameField.length < 5) ? { nameLengthFive: true } : null;
  }
  get f(){
    return this.customerForm.controls;
  }
  close() {
    this.alertMsg.message = ''
  }
  closeModal(){
    this.dialog.closeAll();
  }
  validatePhone(eve:any){
    if(eve.target.value.length > 10){
      return false;
    }else{
      return true;
    }
  }
  submit() {
    if(this.customerForm.value.customerEmailId || this.customerForm.value.customerPhoneNumber){
      if (this.customerForm.valid) {
        if (this.data.mode == 'edit') {
          this.customerForm.value.customerId = this.data.customer.customerId;
          this.dataService.updateAffiliate(this.customerForm.value).subscribe(res => {
            if (res.responseCode == 0) {
              this.alertMsg.type = 'succsess';
              this.alertMsg.message = res.successMsg;
              this.dialogRef.close();
            } else if (res.responseCode == -1) {
              this.alertMsg.type = 'danger';
              this.alertMsg.message = res.errorMsg
            } else {
              this.alertMsg.type = 'danger';
              this.alertMsg.message = "Server error"
            }
          })
        } else {
          this.dataService.addAffiliate(this.customerForm.value).subscribe(res => {
            if (res.responseCode == 0) {
              this.alertMsg.type = 'succsess';
              this.alertMsg.message = res.successMsg;
              this.dialogRef.close();
            } else if (res.responseCode == -1) {
              this.alertMsg.type = 'danger';
              this.alertMsg.message = res.errorMsg
            } else {
              this.alertMsg.type = 'danger';
              this.alertMsg.message = "Server error"
            }
          })
        }
      }
    }else{
      alert("please provide either a phone number or an email")
    }

  }
}

