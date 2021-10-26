import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InitialDataService } from 'src/app/services/initial-data.service';
import { AddModalComponent } from './add-modal/add-modal.component';
import { CardModalComponent } from './card-modal/card-modal.component';


@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
  currentPackage: any;
  paymentHandler:any = null;
  cardActive = 0;
  packs:any =[];
  constructor(private dataService: InitialDataService,public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.dataService.packageDetails().subscribe((res: any) => {
      console.log(res);
      if (res.response) {
        this.currentPackage = res.response.currentPackage;
        this.packs = res.response.upgradePackageList;
        //this.packs[1] = this.packs[0];
      }
    });
    this.invokeStripe();
  }
  makeActiveCard(num :number){
    this.cardActive = num;
  }
  makePayment(amount:number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51Jm51vDpsbIh6JAxazfuiFNvW7GgfGKCfWzDQ7CQMnDESBJVspoeOTdC6mHaQKDQndr0xcrYHF72D39WUIzncGul001m4w72fh',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken)
        if(stripeToken){
          this.da
        }
      }
    });

    paymentHandler.open({
      name: 'Brandaffiliates',
      description: 'Package Upgradation',
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
          key: 'pk_test_51H7bbSE2RcKvfXD4DZhu',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken)
            alert('Payment has been successfull!');
          }
        });
      }

      window.document.body.appendChild(script);
    }
  }
  openCardDialog() {
    let size = ['675px', '475px'];
    if (window.innerWidth > 786) {
      size = ['395px', '360px'];
    } else {
      size = ['350px', '400px'];
    }
    console.log(this.packs)
    const dialogRef = this.dialog.open(CardModalComponent, {
      maxWidth: size[0],
      maxHeight: size[1],
      height: '100%',
      width: '100%',
      data: { packageId: this.packs[this.cardActive].packageId, mode: 'add' },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  addContent(type:string){
    let size = ['675px', '475px'];
    if (window.innerWidth > 786) {
      size = ['495px', '260px'];
    } else {
      size = ['350px', '400px'];
    }
    const dialogRef = this.dialog.open(AddModalComponent, {
      maxWidth: size[0],
      maxHeight: size[1],
      height: '100%',
      width: '100%',
      data: { type: type},
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
}
