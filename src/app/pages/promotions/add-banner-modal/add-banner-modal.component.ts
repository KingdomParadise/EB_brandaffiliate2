import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InitialDataService } from 'src/app/services/initial-data.service';

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
  selectedFile: File;
  selectedFilePath: any = 'assets/images/file-upload-logo.png';
  addBannerForm:FormGroup
  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private dataService: InitialDataService,
    @Optional() public dialogRef: MatDialogRef<AddBannerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    this.addBannerForm = this._formBuilder.group({
      bannerStartDate: ['', Validators.required],
      bannerEndDate: ['', Validators.required],
      bannerName: [''],
      bannerUrlLink: ['', [Validators.required, Validators.pattern(urlRegex)]]
    });
    if (this.data.data) {
      this.addBannerForm.patchValue(this.data.data);
      this.selectedFilePath = this.data.data.bannerImageLink;
    }
  }

  onFileChanged(event: any) {
    const reader = new FileReader();
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (_event) => {
        this.selectedFilePath = reader.result;
      }
    }
  }
  close(){

  }
  submit(){
    if (this.addBannerForm.valid) {
      let formData = new FormData();
      if (this.data.data) {
        this.addBannerForm.value.bannerId = this.data.data.bannerId;
        formData.append('data', JSON.stringify(this.addBannerForm.value));
        formData.append('image', this.selectedFile);
        this.dataService.updateBanner(formData).subscribe(res => {
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
        formData.append('data', JSON.stringify(this.addBannerForm.value));
        formData.append('image', this.selectedFile);
        this.dataService.addBanner(formData).subscribe(res => {
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
  closeModal() {
    this.dialogRef.close();
  }
  
}
