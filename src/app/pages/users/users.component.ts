import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { InitialDataService } from 'src/app/services/initial-data.service';

import * as FileSaver from 'file-saver';
const EXCEL_EXTENSION = '.xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
import * as XLSX from 'xlsx';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SendMessageModalComponent } from '../affiliates/send-message-modal/send-message-modal.component';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';

export interface PeriodicElement {
  userId:number,
  userPhotoUrl: number,
  status: string,
  firstName: string;
  emailId: string;
  admin:number;
  createTs: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['select', 'userPhotoUrl', 'status', 'firstName', 'emailId','admin','createTs', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  customers: any[] = [];
  selection = new SelectionModel<PeriodicElement>(true, []);
  alertMsg: any = {
    type: '',
    message: ''
  };
  filterText = '';
  pagination = {
    pageSize:0,
    length:1000,
  };
  currentQuery:any = {
    type: 'all',
    sort: '',
    searchString: '',
  };
  loading:boolean =  true;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public dialog: MatDialog,
    private dataService: InitialDataService,
  ) { }

  ngOnInit(): void {

    this.getNextData({}, this.pagination.pageSize, this.pagination.length, 0);
    // this.dataService.getAllAffiliate(query,0,2).subscribe(res => {
    //   this.dataSource.data = res.response.customerList;
    //   this.dataSource.paginator = this.paginator;
    // });
    if(window.innerWidth < 786){
      //this.displayedColumns= ['select', 'userPhotoUrl',  'firstName','status','phoneNumber','admin', 'action'];
    }
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.userId + 1}`;
  }

  applyFilter() {
    // this.currentQuery = {
    //   type: "all",
    //   sort: "dateAdded",
    //   searchString: this.filterText
    // }
    // this.getNextData(this.currentQuery, this.pagination.pageSize, this.pagination.length, 0);
    this.dataSource.filter = this.filterText.trim().toLowerCase();
  }

  openSendMsgDialog(customer: any, mode: string) {
    let openDialog = true;
    let customers: any = [];
    if (mode == 'single') {
      customers.push(customer);
    } else {
      if (this.selection.selected.length == 0) {
        alert("Select atleast one value");
        openDialog = false;
      } else {
        customers = this.selection.selected;
      }
    }

    let size = ['375px', '375'];
    if (window.innerWidth > 786) {
      size = ['475px', '430px'];
    } else {
      size = ['350px', '400px'];
    }
    if (openDialog) {
      const dialogRef = this.dialog.open(SendMessageModalComponent, {
        maxWidth: size[0],
        maxHeight: size[1],
        height: '100%',
        width: '100%',
        data: customers,
        disableClose: false
      });

      dialogRef.afterClosed().subscribe(result => {
      });
    }
  }
  getNextData(query:any, page:any, size:any, previousSize?:any){
    this.loading = true;
    this.dataService.getAllUser(query,page,size).subscribe(res => {
      this.customers.length = previousSize;
      this.customers.push(...res.response.userList);
      this.customers.length = res.response.userList.length //res.response.totalItems;
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.customers);
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
  }
  pageChanged(event:any){

    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;
    this.pagination.pageSize = pageIndex;
    this.pagination.length = pageSize;
    let previousIndex = event.previousPageIndex;

    let previousSize = pageSize * pageIndex;
    // let query = {
    //   type: 'all',
    //   sort: '',
    //   searchString: '',
    // }
    this.getNextData(this.currentQuery, pageIndex.toString(), pageSize, previousSize);
  }
  openAddDialog() {
    let size = ['675px', '475px'];
    if (window.innerWidth > 786) {
      size = ['675px', '420px'];
    } else {
      size = ['350px', '500px'];
    }
    const dialogRef = this.dialog.open(AddUserModalComponent, {
      maxWidth: size[0],
      maxHeight: size[1],
      height: '100%',
      width: '100%',
      data: { customer: {}, mode: 'add' },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      let query = {
        type: 'all',
        sort: '',
        searchString: '',
      }
      // this.dataService.getAllAffiliate(query, 0, 2).subscribe(res => {
      //   this.dataSource.data = res.response.customerList;
      // })
      this.getNextData(query, this.pagination.pageSize, this.pagination.length, 0);
    });
  }
  editAffiliate(customer: any) {
    let size = ['675px', '475px'];
    if (window.innerWidth > 786) {
      size = ['675px', '420px'];
    } else {
      size = ['350px', '400px'];
    }
    const dialogRef = this.dialog.open(AddUserModalComponent, {
      maxWidth: size[0],
      maxHeight: size[1],
      height: '100%',
      width: '100%',
      data: { customer: customer, mode: 'edit' },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      let query = {
        type: 'all',
        sort: '',
        searchString: '',
      }
      this.dataService.getAllUser(query,0,10).subscribe(res => {
        this.dataSource.data = res.response.userList;
      });
    });
  }
  deleteUser(customerId: number, index: number) {
    if(confirm('Want to delete?')){
      this.dataService.deleteAffiliate({ customerId: customerId }).subscribe(res => {
        if (res.responseCode == 0) {
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription();
        } else if (res.responseCode == -1) {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = res.errorMsg
        } else {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = "Server error"
        }
      });
    }else{

    }

  }
  toggleUserStatus(user:any){
    if(user.status == 'active'){
      this.dataService.disableUser({userId: user.userId}).subscribe( res  =>{
        this.getNextData({}, this.pagination.pageSize, this.pagination.length, 0);
      })
    }else{
      this.dataService.enableUser({userId: user.userId}).subscribe( res  =>{
        this.getNextData({}, this.pagination.pageSize, this.pagination.length, 0);
      })
    }

  }
  sortTable(prop: any) {
    if (prop == 'dateAdded') {
      this.currentQuery = {
        type: "all",
        sort: "dateAdded",
        searchString: ""
      }
    }else if(prop == 'alpha'){
      this.currentQuery  = {
        type: "all",
        sort: "alpha",
        searchString: ""
      }
    }else if(prop == 'verified'){
      this.currentQuery  = {
        type: "verified",
        sort: "dateAdded",
        searchString: ""
      }
    }else if(prop == 'unverified'){
      this.currentQuery  = {
        type: "unverified",
        sort: "dateAdded",
        searchString: ""
      }
    }
    this.getNextData(this.currentQuery, this.pagination.pageSize, this.pagination.length, 0);
    //the below code is for client side sorting
    //this.dataSource.data = this.dataSource.data.sort(dynamicSort(prop));
  }

  clearSearch() {
    this.filterText = '';
    this.applyFilter();
  }
  close() {
    this.alertMsg.message = ''
  }
  deleteMultipleRecords() {
    if (this.selection.selected.length == 0) {
      alert("Select atleast one value");
    } else if(confirm('Want to delete?')){
      let payload = {
        userIdList: this.selection.selected.map(customer => { return customer.userId })
      }
      this.dataService.deleteUserList(payload).subscribe(res => {
        if (res.responseCode == 0) {
          this.alertMsg.type = 'success';
          this.alertMsg.message = res.successMsg;
          this.selection.selected.forEach(item => {
            let index: number = this.dataSource.data.findIndex(d => d === item);
            this.dataSource.data.splice(index, 1)
          });
          this.dataSource._updateChangeSubscription();
          this.selection = new SelectionModel<PeriodicElement>(true, []);
        } else if (res.responseCode == -1) {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = res.errorMsg
        } else {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = "Server error"
        }
      });
    }
  }

  public downloadExcel(): void {
    let ls = this.dataSource.data;
    let excelFileName: string ="affiliates";
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(ls);
    const workbook: XLSX.WorkBook = { Sheets: { 'Sheet1': worksheet }, SheetNames: ['Sheet1'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}


function dynamicSort(property:any) {
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return (a:any, b:any) => {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      // x = a[property]
      if(property == 'createTs'){
        var result = (new Date(a[property]) < new Date(b[property])) ? -1 : (new Date(a[property]) > new Date(b[property])) ? 1 : 0;
      }else{
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      }

      return result * sortOrder;
  }
}
