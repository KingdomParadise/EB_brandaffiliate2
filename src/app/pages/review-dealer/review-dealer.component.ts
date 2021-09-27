import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-dealer',
  templateUrl: './review-dealer.component.html',
  styleUrls: ['./review-dealer.component.css']
})
export class ReviewDealerComponent implements OnInit {

  constructor( public router: Router) { }

  ngOnInit(): void {
  }

  goToNextPage(){
    this.router.navigateByUrl('/complete-profile')
  }
}
