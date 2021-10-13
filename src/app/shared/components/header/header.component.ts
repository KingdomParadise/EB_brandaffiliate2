import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactUsComponent } from 'src/app/pages/contact-us/contact-us.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  isExpanded: boolean = true;
  userPhotoUrl: any;
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  constructor(public dialog: MatDialog,) {
    
    let userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.userPhotoUrl = userData.userPhotoUrl;
  }
  selected: any = '0';
  ngOnInit(): void {
  }
  
  toggleSideBar(){
    this.toggleSideBarForMe.emit();
    this.isExpanded = !this.isExpanded
  }
  openContactUs(){
    const dialogRef = this.dialog.open(ContactUsComponent, {
      maxWidth: '600px',
      maxHeight: '400px',
      height: '100%',
      width: '100%',
      data: {},
      disableClose: false
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

