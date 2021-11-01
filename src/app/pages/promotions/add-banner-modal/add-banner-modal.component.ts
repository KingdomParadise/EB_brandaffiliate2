import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-banner-modal',
  templateUrl: './add-banner-modal.component.html',
  styleUrls: ['./add-banner-modal.component.css']
})
export class AddBannerModalComponent implements OnInit {
  alertMsg: any = {
    type: '',
    message: ''
  };
  addBannerForm:FormGroup
  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    @Optional() public dialogRef: MatDialogRef<AddBannerModalComponent>,
  ) { }

  ngOnInit(): void {
    this.addBannerForm = this._formBuilder.group({
      subject: ['', Validators.required],
      msg: ['', Validators.required],
      fileUpload: [''],
    });
  }

  close(){

  }
  submit(){

  }
  closeModal() {
    this.dialogRef.close();
  }
}
