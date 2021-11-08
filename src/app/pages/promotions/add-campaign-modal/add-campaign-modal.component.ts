import { Component, ElementRef, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  mode = 'add';
  @ViewChild('myInterests') myInterests;
  campaignType: any = '';
  isEditable = true;
  selectedFile: File;
  selectedFilePath: any = 'assets/images/file-upload-logo.png';

  selectedVideoFile: File;
  selectedVideoFilePath: any = '';

  selectedThumbnailFile: File;
  selectedThumbnailFilePath: any = '';

  addCampaignForm: FormGroup;
  addCampaignForm2: FormGroup;
  industries: any[] = [];
  @ViewChild('fileUpload') fileUpload: ElementRef;
  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private dataService: InitialDataService,
    @Optional() public dialogRef: MatDialogRef<AddCampaignModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.dataService.getIndustries().subscribe(data => {
      this.industries = data.response.industryList;
      // this.addCampaignForm2.patchValue({
      //   intrestIdList: [{industryId:1},{industryId:2}]
      // })
      this.myInterests.select([{industryId: 1, industryName: "Sports", imageUrl: "http://35.182.216.225:8000/sports.png"}]);
    });
    this.addCampaignForm = this._formBuilder.group({
      campaignStartDate: ['', Validators.required],
      campaignEndDate: ['', Validators.required],
      campaignName: ['', Validators.required],
      campaignURL: ['', Validators.required],
      campaignDescription: ['', Validators.required],
    });
    this.addCampaignForm2 = this._formBuilder.group({
      hashTag: [''],
      intrestIdList: [null],
      campaignType: ['image'],
    });
  
    if (this.data.data) {
      console.log(this.data.data);
      this.mode = 'edit';
      this.addCampaignForm.patchValue(this.data.data);
      //this.addCampaignForm2.patchValue(this.data.data);
      this.addCampaignForm.patchValue({
        campaignURL: this.data.data.originalUrlLink
      })
      
      this.campaignType = this.data.data.campaignType;
      if(this.data.data.campaignType == 'image'){
        this.selectedFilePath = this.data.data.campaignImageLink;
      }else if(this.data.data.campaignType == 'video'){
        this.selectedVideoFilePath = this.data.data.campaignVideoLink;
        this.selectedThumbnailFilePath= this.data.data.campaignImageLink;
      }
    }
    
  }
  onFileChanged(event: any, type: string) {
    this.campaignType = type;
    const reader = new FileReader();
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (_event) => {
        this.selectedFilePath = reader.result;
        this.campaignType = type;
      }
    }
  }
  onFileChangedVideo(event: any, type: string) {
    //this.campaignType = type;
    const reader = new FileReader();
    this.selectedVideoFile = event.target.files[0];
    console.log(this.selectedVideoFile);
    if (this.selectedVideoFile) {
      reader.readAsDataURL(this.selectedVideoFile);
      reader.onload = (_event) => {
        this.selectedVideoFilePath = this.selectedVideoFile.name;
        this.campaignType = type;
      }
    }
  }
  onFileChangedThumbnail(event: any, type: string) {
    const reader = new FileReader();
    this.selectedThumbnailFile = event.target.files[0];
    if (this.selectedThumbnailFile) {
      reader.readAsDataURL(this.selectedThumbnailFile);
      reader.onload = (_event) => {
        this.selectedThumbnailFilePath = this.selectedThumbnailFile.name;
        this.campaignType = type;
      }
    }
  }

  close() {

  }
  submit() {

  }
  closeModal() {
    this.dialogRef.close();
  }
  addNewCampaign() {
    this.addCampaignForm2.patchValue({
      campaignType: this.campaignType
    })
    let formData = new FormData();
    
    if (this.campaignType == 'image') {
      formData.append('image', this.selectedFile);
    } else if(this.campaignType == 'video'){
      formData.append('video', this.selectedVideoFile);
      formData.append('image', this.selectedThumbnailFile);
    }
    if(this.mode == 'add'){
      formData.append('data', JSON.stringify({ ...this.addCampaignForm.value, ...this.addCampaignForm2.value }));
      this.dataService.addCampaign(formData).subscribe(res => {
        console.log(res);
        if (res.responseCode == 0) {
          this.closeModal();
        } else if (res.responseCode == -1) {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = res.errorMsg;
        }
      });
    }else{
      this.addCampaignForm.value.campaignId = this.data.data.campaignId;
      formData.append('data', JSON.stringify({ ...this.addCampaignForm.value, ...this.addCampaignForm2.value }));
      this.dataService.updateCampaign(formData).subscribe(res => {
        console.log(res);
        if (res.responseCode == 0) {
          this.closeModal();
        } else if (res.responseCode == -1) {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = res.errorMsg;
        }
      });
    }
    
  }
  // onTypeSelection(eve:any){
  //   console.log(eve.value);
  //   this.campaignType = eve.value;
  //   //this.fileUpload.nativeElement.click();
  // }
}
