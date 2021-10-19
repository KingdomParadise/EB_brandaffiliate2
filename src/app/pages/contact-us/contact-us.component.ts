import { Component, Inject, NgZone, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  alertMsg: any = {
    type: '',
    message: ''
  };
  selectedFile: File;
  selectedFilePath: any = 'assets/images/file-upload-logo.png';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder: any;
  map: google.maps.Map;

  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private dataService: InitialDataService,
    @Optional() public dialogRef: MatDialogRef<ContactUsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.contactForm = this._formBuilder.group({
      subject: ['', Validators.required],
      msg: ['', Validators.required],
      fileUpload: [''],
    });
  }
  close() {
    this.alertMsg.message = ''
  }
  onFileChanged(event: any, type: string) {
    const reader = new FileReader();
    this.selectedFile = event.target.files[0];
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_event) => {
      this.selectedFilePath = reader.result;
    }
  }
  submit() {
    if (this.contactForm.valid) {
      let formData = new FormData();
      formData.append('data', JSON.stringify(this.contactForm.value));
      formData.append('uploadedFile', this.selectedFile);

      this.dataService.contactUs(formData).subscribe(res => {
        if (res.responseCode == 0) {
          this.alertMsg.type = 'succsess';
          this.alertMsg.message = res.successMsg;
          setTimeout(()=>{
            this.dialogRef.close();
          },1000)
        } else if (res.responseCode == -1) {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = res.errorMsg
        } else {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = "Server error"
        }
      });
    }
  }
  closeModal() {
    this.dialogRef.close();
  }
}
