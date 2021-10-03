import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  isPartialClose = false;
  sideBarOpen = true;
  marginLeft = '0px';
  constructor() { }

  ngOnInit(): void {
    if (window.innerWidth < 786) {
      this.sideBarOpen = false;
      this.isPartialClose = false;
    }else{

      this.marginLeft = '240px';
    }
  }
  sideBarToggler() {
    if (window.innerWidth < 786) {
      this.sideBarOpen = !this.sideBarOpen;
      this.marginLeft = '0px'
    }else{

      this.isPartialClose = !this.isPartialClose;
      if(this.isPartialClose){
        this.marginLeft = '60px';
      }else{
        this.marginLeft ='240px'
      }
    }
  }
}
