import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent implements OnInit {

  customerForm: FormGroup;
  alertMsg: any = {
    type: '',
    message: ''
  };
  selectedFile: File;
  selectedFilePath: any = 'assets/images/UserPhotoCopy.png';
  constructor(
    private dataService: InitialDataService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    @Optional() public dialogRef: MatDialogRef<AddUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
    this.customerForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      userType: ['', Validators.required]
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
  onFileChanged(event: any, type: string) {
    const reader = new FileReader();
    this.selectedFile = event.target.files[0];
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_event) => {
      this.selectedFilePath = reader.result;
    }
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
      let formData = new FormData();
      formData.append('data', JSON.stringify(this.customerForm.value));
      formData.append('userPhoto', this.selectedFile);
      if (this.data.mode == 'edit') {
        this.customerForm.value.customerId = this.data.customer.customerId;
        this.dataService.updateAffiliate(formData).subscribe(res => {
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
        this.dataService.addUser(formData).subscribe(res => {
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
