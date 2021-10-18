import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    console.log(this.data);
    this.customerForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      customerEmailId: ['', Validators.required],
      customerPhoneNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]  
    });
    if (this.data.mode == 'edit') {
      this.customerForm.patchValue(this.data.customer);
    }
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
    console.log(eve.target.value.length);
    if(eve.target.value.length > 10){
      return false;
    }else{
      return true;
    }
  }
  submit() {
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
  }
}

