import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ContactUsComponent } from 'src/app/pages/contact-us/contact-us.component';
import { SelectPackageModalComponent } from 'src/app/pages/select-package-modal/select-package-modal.component';
import { InitialDataService } from 'src/app/services/initial-data.service';

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
  constructor(
    public dialog: MatDialog,
    public router: Router,
    private dataService: InitialDataService,
  ) {
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
  goToPackagePage() {
    
      if (this.userData.packagePurchased  == 1) {
        this.router.navigateByUrl('/packages')
      } else {
        let size = ['875px', '475px'];
        if (window.innerWidth > 786) {
          size = ['875px', '520px'];
        } else {
          size = ['96%', '500px'];
        }
        const dialogRef = this.dialog.open(SelectPackageModalComponent, {
          width: size[0],
          height: size[1],
          data: {},
          disableClose: true,
          panelClass: 'package-dialog'
        });
      }
    
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/dealer-login');
  }
}
