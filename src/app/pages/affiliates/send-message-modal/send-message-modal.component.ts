import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-send-message-modal',
  templateUrl: './send-message-modal.component.html',
  styleUrls: ['./send-message-modal.component.css']
})
export class SendMessageModalComponent implements OnInit {
  messageForm: FormGroup;
  customers = [];
  customerNames:any;
  customerIds:any;
  alertMsg: any = {
    type: '',
    message: ''
  };
  constructor(
    private dataService: InitialDataService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    @Optional() public dialogRef: MatDialogRef<SendMessageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.customers = this.data;
    this.customerNames = this.customers.map(customer => {return customer['firstName']});
    this.customerIds = this.customers.map(customer => {return customer['customerId']});
    this.messageForm = this._formBuilder.group({
      msg: ['', Validators.required],
    });
  }
  close() {
    this.alertMsg.message = ''
  }
  closeModal(){
    this.dialog.closeAll();
  }
  submit(type:string) {
    if (this.messageForm.valid) {
      let payload = {
        customerIdList: this.customerIds,
        sendSms:0,
        sendEmail:0,
        msg: this.messageForm.value.msg
      }
      if(type == 'sms'){
        payload.sendSms = 1;
        payload.sendEmail = 0;
      }else if(type == 'email'){
        payload.sendSms = 0;
        payload.sendEmail = 1;
      }else if(type == 'both'){
        payload.sendSms = 1;
        payload.sendEmail = 1;
      }
      this.dataService.sendCustomerMessage(payload).subscribe(res => {
        if (res.responseCode == 0) {
          this.alertMsg.type = 'succsess';
          this.alertMsg.message = res.successMsg;
          setTimeout(()=>{
            this.dialogRef.close();
          },100)
          
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
