import { Component, OnInit,Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  date1 = new Date();
  userPhotoUrl: any = '';
  userData:any;
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  @Input() isPartialClose: boolean;
  //isExpanded = false;
  constructor() {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.userPhotoUrl = this.userData.userPhotoUrl;
    console.log(this.userData);
  }

  ngOnInit(): void {
  }
  toggleSideBar(){
    if(window.innerWidth < 786){
      this.toggleSideBarForMe.emit();
      //this.isExpanded = !this.isExpanded
    }else{
      alert(8);
      this.isPartialClose = !this.isPartialClose;

    }
    
  }
}
