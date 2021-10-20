import { Component, OnInit } from '@angular/core';
import { InitialDataService } from 'src/app/services/initial-data.service';


@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
  currentPackage: any;
  additionalPackage: any;
  paymentHandler:any = null;
  constructor(private dataService: InitialDataService,) { }

  ngOnInit(): void {
    this.dataService.packageDetails().subscribe((res: any) => {
      console.log(res);
      if (res.response) {
        this.currentPackage = res.response.currentPackage;
        this.additionalPackage = res.response.upgradePackageList[0];
      }
    });
    this.invokeStripe();
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
}