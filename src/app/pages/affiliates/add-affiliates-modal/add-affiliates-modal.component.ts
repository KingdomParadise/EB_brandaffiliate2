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
    this.customerForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      customerEmailId: ['', Validators.required],
      customerPhoneNumber: ['', Validators.required],
    });
  }
  close() {
    this.alertMsg.message = ''
  }
  submit() {
    if (this.customerForm.valid) {
      this.dataService.addAffiliate(this.customerForm.value).subscribe(res => {
        if (res.responseCode == 0) {
          this.alertMsg.type = 'succsess';
          this.alertMsg.message = res.successMsg
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

