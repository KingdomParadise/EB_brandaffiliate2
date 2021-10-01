import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-review-dealer',
  templateUrl: './review-dealer.component.html',
  styleUrls: ['./review-dealer.component.css']
})
export class ReviewDealerComponent implements OnInit {
  message:any;
  constructor( public location: Location, public router: Router, private activatedroute:ActivatedRoute) { 
   
  }

  ngOnInit(): void {
    console.log(history.state)
    this.message = history.state.msg
  }

  goBack(){
    this.location.back();
  }
}
