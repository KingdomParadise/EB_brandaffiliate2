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
  upgradePackageList: any[] = [];

  confirmation: any;
  loading = false;
  paymentHandler:any = null;
  constructor(
    public dialog: MatDialog,
    private dataService: InitialDataService,
    @Optional() public dialogRef: MatDialogRef<SelectPackageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.invokeStripe();
    this.dataService.packageDetails().subscribe(res => {
      if (res.responseCode == 0) {
        this.upgradePackageList = res.response.upgradePackageList;
      }
    });
  }
  close() {
    this.alertMsg.message = '';
  }
  closeModal() {
    this.dialog.closeAll();
  }
  makeActiveCard(i: number) {
    this.cardActive = i;
  }
  purchasePackage() {
    let amount = this.upgradePackageList[this.cardActive].packagePrice;
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KCAH4KvYzveXmtdY6ZVxJaeVC87kHUdQ3bb6cEqd07q7B61Ckcs2bKYPHaP5icnN8ppR7eUY2CyewSA72VxyUcu00ibgfLCmk',
      locale: 'auto',
      token:  (stripeToken: any) =>{
        let req = {
          packageId: this.upgradePackageList[this.cardActive].packageId,
          stripeToken: stripeToken.id
        }
        this.dataService.purchasePackage(req).subscribe(res => {
          if (res.responseCode == 0) {
            this.alertMsg.type = 'succsess';
            this.alertMsg.message = res.successMsg;
            this.updatePackageFlag();
            alert(res.successMsg);
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
      description: 'Package Payment',
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
          }
        });
      }

      window.document.body.appendChild(script);
    }
  }
  makePayment(amount) {

  }
  updatePackageFlag(){
    let storedData = JSON.parse(localStorage.getItem('userData') || '{}');
    storedData.packagePurchased = 1;
    localStorage.setItem('userData', JSON.stringify(storedData));
    this.dataService.userData$.next(storedData);
  }
}
