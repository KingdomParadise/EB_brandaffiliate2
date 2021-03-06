import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InitialDataService } from 'src/app/services/initial-data.service';
import { AddAffiliatesModalComponent } from '../../affiliates/add-affiliates-modal/add-affiliates-modal.component';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.css']
})
export class CardModalComponent implements OnInit {

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
      name: ['', Validators.required],
      cardNumber: ['', Validators.required],
      month: ['', [Validators.required, Validators.max(12)]],
      year: ['',[Validators.required, Validators.max(99)]],
      cvv: ['']  
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
  purchasePackage(){
    let req = {
      packageId: this.data.packageId,
      stripeToken: ''
    }
    this.dataService.purchasePackage(req).subscribe( res =>{
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

