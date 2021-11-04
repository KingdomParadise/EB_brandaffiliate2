import { Component, OnInit, Optional } from '@angular/core';
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
  isEditable = true;
  selectedFile: File;
  selectedFilePath: any = 'assets/images/file-upload-logo.png';
  addCampaignForm:FormGroup;
  addCampaignForm2:FormGroup;
  industries:any[] = [];
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
      campaignName: [''],
      campaignDescription: [''],

      hashTag: [''],
      campaignType: ['image'],
    });
    this.addCampaignForm2 = this._formBuilder.group({
      campaignURL: [''],
      intrestIdList: [null],
    });
  }
  onFileChanged(event: any, type: string) {
    const reader = new FileReader();
    this.selectedFile = event.target.files[0];
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_event) => {
      this.selectedFilePath = reader.result;
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
    let formData = new FormData();
    formData.append('data', JSON.stringify(this.addCampaignForm.value));
    formData.append('image', this.selectedFile);
    this.dataService.addCampaign(formData).subscribe(res => {
      console.log(res);
    })
  }
}
