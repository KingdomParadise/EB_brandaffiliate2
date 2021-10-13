import { Component, Inject, NgZone, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {} from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  selectedFilePath:any = 'assets/images/file-upload-logo.png';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder:any;
  map: google.maps.Map;
  
  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    @Optional() public dialogRef: MatDialogRef<ContactUsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.contactForm = this._formBuilder.group({
      subject: ['', Validators.required],
      msg: ['', Validators.required],
      fileUpload: ['', Validators.required],
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
  submit(){

  }
  closeModal(){
    this.dialogRef.close();
  }
}
