import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  duration: string;
  title: string;
  url: string;
  image: string;
  status:any;
  action:any
}
const ELEMENT_DATA: PeriodicElement[] = [
  {duration: "23 sep 2021 - 27 sep 2021", title: 'Henson Nation', url: 'Brand Auto Dealer', image: 'https://picsum.photos/100',status:'active', action: ''},
 
];
@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})

export class PromotionsComponent implements OnInit {
  alertMsg: any = {
    type: '',
    message: ''
  };
  displayedColumns: string[] = ['duration', 'title', 'url', 'image','status','action'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }
  close() {
    this.alertMsg.message = ''
  }
  applyFilter(){

  }
  clearSearch(){

  }
  openAddDialog(){

  }
  deleteMultipleRecords(){

  }
}
