import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-select-package-modal',
  templateUrl: './select-package-modal.component.html',
  styleUrls: ['./select-package-modal.component.css']
})
export class SelectPackageModalComponent implements OnInit {
  alertMsg: any = {
    type: '',
    message: ''
  };
  cardActive = 0
  upgradePackageList:any[] = [];
  constructor(
    public dialog: MatDialog,
    private dataService: InitialDataService,
    @Optional() public dialogRef: MatDialogRef<SelectPackageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.dataService.packageDetails().subscribe(res =>{
      if(res.responseCode == 0){
        this.upgradePackageList = res.response.upgradePackageList
      }
      
    })
  }
  close() {
    this.alertMsg.message = '';
  }
  closeModal() {
    this.dialog.closeAll();
  }
  makeActiveCard(i:number){
    this.cardActive = i;
  }
  purchasePackage(){
    let req = {
      packageId: this.upgradePackageList[this.cardActive].packageId,
      stripeToken: ''
    }
    this.dataService.purchasePackage(req).subscribe( res =>{
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
