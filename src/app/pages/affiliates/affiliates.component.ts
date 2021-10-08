import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { InitialDataService } from 'src/app/services/initial-data.service';
import { AddAffiliatesModalComponent } from './add-affiliates-modal/add-affiliates-modal.component';
import { SendMessageModalComponent } from './send-message-modal/send-message-modal.component';

export interface PeriodicElement {
  customerId:number,
  verified:string,
  firstName: string;
  customerEmailId: string;
  customerPhoneNumber: string;
  //dateAdded: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
];

@Component({
  selector: 'app-affiliates',
  templateUrl: './affiliates.component.html',
  styleUrls: ['./affiliates.component.css']
})
export class AffiliatesComponent implements OnInit {

  displayedColumns: string[] = ['select', 'customerId', 'verified', 'firstName', 'customerEmailId', 'customerPhoneNumber', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  constructor(
    public dialog: MatDialog,
    private dataService: InitialDataService,
  ) { }

  ngOnInit(): void {
    let query = {
      type:'all',
      sort:'',
      searchString:'',
    }
    this.dataService.getAllAffiliate(query).subscribe( res =>{
      this.dataSource.data = res.response.customerList;
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data?.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.customerId + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openSendMsgDialog(){
    let size = ['375px','375'];
    if(window.innerWidth > 786){
      size = ['475px','350px'];
    }else{
      size = ['350px','400px'];
    }
    const dialogRef = this.dialog.open(SendMessageModalComponent, {
      maxWidth: size[0],
      maxHeight: size[1],
      height: '100%',
      width: '100%',
      data: "h",
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      //this.animal = result;
    });
  }
  openAddDialog(){
    let size = ['675px','475px'];
    if(window.innerWidth > 786){
      size = ['675px','420px'];
    }else{
      size = ['350px','400px'];
    }
    const dialogRef = this.dialog.open(AddAffiliatesModalComponent, {
      maxWidth: size[0],
      maxHeight: size[1],
      height: '100%',
      width: '100%',
      data: "h",
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      //this.animal = result;
      let query = {
        type:'all',
        sort:'',
        searchString:'',
      }
      this.dataService.getAllAffiliate(query).subscribe( res =>{
        this.dataSource.data = res.response.customerList;
      })
    });
  }
}
