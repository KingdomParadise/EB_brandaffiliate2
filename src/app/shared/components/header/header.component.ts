import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactUsComponent } from 'src/app/pages/contact-us/contact-us.component';
import { InitialDataService } from 'src/app/services/initial-data.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  isExpanded: boolean = true;
  userPhotoUrl: any;
  userData: any;
  notificationList: any;
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  constructor(public dialog: MatDialog, private dataService: InitialDataService) {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.userPhotoUrl = this.userData.userPhotoUrl;
    console.log(this.userData);
  }
  selected: any = '0';
  ngOnInit(): void {
    this.dataService.getDealerNotification().subscribe(res => {
      this.notificationList = res.response.notificationList;
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
      console.log('The dialog was closed', result);
      let query = {
        type: 'all',
        sort: '',
        searchString: '',
      }
    });
  }
}

