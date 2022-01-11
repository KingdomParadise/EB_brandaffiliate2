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
  perContentCharge = 75;
  count = 0;
  paymentHandler:any = null;
  title= 'Add Campaign Content';
  constructor(
    public dialog: MatDialog,
    private dataService: InitialDataService,
    @Optional() public dialogRef: MatDialogRef<AddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if(this.data.type == "campaign"){
      this.title= 'Add Campaign Content';
    }else{
      this.title= 'Add Banners';
    }
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
    let amount = this.perContentCharge*this.count;
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KCAH4KvYzveXmtdY6ZVxJaeVC87kHUdQ3bb6cEqd07q7B61Ckcs2bKYPHaP5icnN8ppR7eUY2CyewSA72VxyUcu00ibgfLCmk',
      locale: 'auto',
      token:  (stripeToken: any) =>{
        req.stripeToken =  stripeToken.id
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
    });

    paymentHandler.open({
      name: 'Brandaffiliate',
      description: 'Content Upgrade Payment',
      amount: amount * 100
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51KCAH4KvYzveXmtdY6ZVxJaeVC87kHUdQ3bb6cEqd07q7B61Ckcs2bKYPHaP5icnN8ppR7eUY2CyewSA72VxyUcu00ibgfLCmk',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken)
          }
        });
      }

      window.document.body.appendChild(script);
    }
  }

}
