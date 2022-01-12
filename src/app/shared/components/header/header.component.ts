import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactUsComponent } from 'src/app/pages/contact-us/contact-us.component';
import { SupportModalComponent } from 'src/app/pages/support-modal/support-modal.component';
import { InitialDataService } from 'src/app/services/initial-data.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  isExpanded: boolean = true;
  isNewNotification: boolean = false;
  userPhotoUrl: any;
  userData: any;
  notificationList: any;
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  constructor(public dialog: MatDialog, private dataService: InitialDataService) {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.userPhotoUrl = this.userData.userPhotoUrl;
  }
  selected: any = '0';

  ngOnInit(): void {
    this.getNotifications();
    this.dataService.notificationInterval = setInterval(()=>{this.getNotifications()},30000);

  }

  getNotifications(){
    this.dataService.getDealerNotification().subscribe(res => {
      this.notificationList = res.response.notificationList;
      this.isNewNotification = res.response.unReadNotification
    });
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    this.isExpanded = !this.isExpanded
  }
  openContactUs() {
    let size = ['675px', '475px'];
    if (window.innerWidth > 786) {
      size = ['675px', '430px'];
    } else {
      size = ['96%', '500px'];
    }
    const dialogRef = this.dialog.open(ContactUsComponent, {
      width: size[0],
      height: size[1],
      data: {},
      disableClose: false,
      panelClass: 'contact-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      let query = {
        type: 'all',
        sort: '',
        searchString: '',
      }
    });
  }
  openSupport() {
    let size = ['675px', '475px'];
    if (window.innerWidth > 786) {
      size = ['700px', '520px'];
    } else {
      size = ['96%', '500px'];
    }
    const dialogRef = this.dialog.open(SupportModalComponent, {
      width: size[0],
      height: size[1],
      data: {},
      disableClose: false,
      panelClass: 'support-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      let query = {
        type: 'all',
        sort: '',
        searchString: '',
      }
    });
  }
  menuOpened(){
  }
  menuClosed(){
    this.dataService.markDealerNotificationRead().subscribe(res => {
      //console.log(res);
    });
  }
}

