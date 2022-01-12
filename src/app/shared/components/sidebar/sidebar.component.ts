import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationStart, Router } from '@angular/router';

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
  isPackageActive = false;
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  @Input() isPartialClose: boolean;

  constructor(
    public dialog: MatDialog,
    public router: Router,
    private dataService: InitialDataService,
  ) {

  }

  ngOnInit(): void {
    // /this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.userPhotoUrl = this.userData.userPhotoUrl;
    this.dataService.getUserData().subscribe( data =>{
      this.userData = data;
      this.userPhotoUrl = this.userData.userPhotoUrl;
    })

    this.router.events.subscribe(event =>{
      if (event instanceof NavigationStart){
        console.log(event.url != '/packages');
        if(event.url != '/packages'){
          this.isPackageActive = false;
        }
      }
   })
  }
  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    if (window.innerWidth < 786) {
      //this.toggleSideBarForMe.emit();
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

    });
  }
  goToPackagePage() {
    this.isPackageActive = true;
    console.log(this.userData);
    if (this.userData.packagePurchased == 1) {
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

    window.clearInterval(this.dataService.notificationInterval);
    this.router.navigateByUrl('/dealer-login');
  }
}
