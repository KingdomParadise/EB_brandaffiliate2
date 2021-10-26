import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent implements OnInit {
  alertMsg: any = {
    type: '',
    message: ''
  };
  count = 0;
  constructor(
    public dialog: MatDialog,
    private dataService: InitialDataService,
    @Optional() public dialogRef: MatDialogRef<AddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

  }
  close() {
    this.alertMsg.message = ''
  }
  closeModal() {
    this.dialog.closeAll();
  }
  add() {
    this.count = this.count + 1;
  }
  subtract() {
    if (this.count != 0) {
      this.count = this.count - 1;
    }
  }
  purchaseContent() {
    let req;
    if(this.data.type == 'campaign'){
      req = {
        noOfContent: this.count,
        noOfBanner: 0,
        stripeToken: null
      }
    }else{
      req = {
        noOfContent: 0,
        noOfBanner: this.count,
        stripeToken: null
      }
    }
   
    this.dataService.purchaseContent(req).subscribe( res =>{
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
