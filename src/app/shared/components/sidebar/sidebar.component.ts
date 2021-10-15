import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactUsComponent } from 'src/app/pages/contact-us/contact-us.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  date1 = new Date();
  userPhotoUrl: any = '';
  userData: any;
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  @Input() isPartialClose: boolean;
  //isExpanded = false;
  constructor(public dialog: MatDialog) {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.userPhotoUrl = this.userData.userPhotoUrl;
    console.log(this.userData);
  }

  ngOnInit(): void {
  }
  toggleSideBar() {
    if (window.innerWidth < 786) {
      this.toggleSideBarForMe.emit();
      //this.isExpanded = !this.isExpanded
    } else {
      alert(8);
      this.isPartialClose = !this.isPartialClose;

    }

  }
  openContactUs() {
    let size = ['675px', '475px'];
    if (window.innerWidth > 786) {
      size = ['675px', '420px'];
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
