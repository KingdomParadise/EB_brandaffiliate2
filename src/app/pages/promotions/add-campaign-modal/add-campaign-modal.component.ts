import { Component, ElementRef, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-add-campaign-modal',
  templateUrl: './add-campaign-modal.component.html',
  styleUrls: ['./add-campaign-modal.component.css']
})
export class AddCampaignModalComponent implements OnInit {
  alertMsg: any = {
    type: '',
    message: ''
  };
  campaignType:any ='';
  isEditable = true;
  selectedFile: File;
  selectedFilePath: any = 'assets/images/file-upload-logo.png';
  addCampaignForm:FormGroup;
  addCampaignForm2:FormGroup;
  industries:any[] = [];
  @ViewChild('fileUpload') fileUpload:ElementRef;
  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private dataService: InitialDataService,
    @Optional() public dialogRef: MatDialogRef<AddCampaignModalComponent>,
  ) { }

  ngOnInit(): void {
    this.dataService.getIndustries().subscribe(data => {
      this.industries = data.response.industryList;
    });
    this.addCampaignForm = this._formBuilder.group({
      campaignStartDate: ['', Validators.required],
      campaignEndDate: ['', Validators.required],
      campaignName: ['',Validators.required],
      campaignURL: ['',Validators.required],
      campaignDescription: ['',Validators.required],
    });
    this.addCampaignForm2 = this._formBuilder.group({
      hashTag: [''],
      intrestIdList: [null],
      campaignType: ['image'],
    });
  }
  onFileChanged(event: any, type: string) {
    this.campaignType = type;
    const reader = new FileReader();
    this.selectedFile = event.target.files[0];
    if(this.selectedFile){
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (_event) => {
        this.selectedFilePath = reader.result;
        this.campaignType = type;
      }
    }
    
  }

  close(){

  }
  submit(){

  }
  closeModal() {
    this.dialogRef.close();
  }
  addNewCampaign(){
    this.addCampaignForm2.patchValue({
      campaignType: this.campaignType
    })
    let formData = new FormData();
    formData.append('data', JSON.stringify({...this.addCampaignForm.value,...this.addCampaignForm2.value}));
    formData.append('image', this.selectedFile);
    this.dataService.addCampaign(formData).subscribe(res => {
      console.log(res);
    })
  }
  // onTypeSelection(eve:any){
  //   console.log(eve.value);
  //   this.campaignType = eve.value;
  //   //this.fileUpload.nativeElement.click();
  // }
}
