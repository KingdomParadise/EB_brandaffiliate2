import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { InitialDataService } from 'src/app/services/initial-data.service';
import { AddBannerModalComponent } from './add-banner-modal/add-banner-modal.component';
import { AddCampaignModalComponent } from './add-campaign-modal/add-campaign-modal.component';

export interface Banner {
  duration: string;
  title: string;
  image: string;
  status: any;
  action: any
}
// const ELEMENT_DATA: Banner[] = [
//   { duration: "23 sep 2021 - 27 sep 2021", title: 'Henson Nation', url: 'Brand Auto Dealer', image: 'https://picsum.photos/100', status: 'active', action: '' },

// ];
@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})

export class PromotionsComponent implements OnInit {
  alertMsg: any = {
    type: '',
    message: ''
  };
  pagination = {
    pageSize: 0,
    length: 5,
  };
  currentTabIndex = 0;
  banners: any[] = [];
  campaigns:any[] = [];
  selection = new SelectionModel<Banner>(true, []);
  loading: boolean = true;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('tabGroup') tabGroup:any;
  currentQuery: any = {
    searchString: '',
  };
  displayedColumns: string[] = ['duration', 'title', 'image', 'status', 'action'];
  dataSourceBanner = new MatTableDataSource<Banner>([]);
  dataSourceCampaign = new MatTableDataSource<Banner>([]);
  constructor(
    public dialog: MatDialog,
    private dataService: InitialDataService
  ) { }

  ngOnInit(): void {
    this.getBannerData(this.currentQuery, this.pagination.pageSize, this.pagination.length);
    this.getCampaignData(this.currentQuery, this.pagination.pageSize, this.pagination.length);
    
  }
  getBannerData(query: any, page: any, size: any, previousSize?: any) {
    this.loading = true;
    this.dataService.getAllBanner(query, page, size).subscribe(res => {
      this.banners.length = 0 // previousSize;
      this.banners.push(...res.response.bannerList);
      this.banners.length = res.response.bannerList.length //res.response.totalItems;
      this.dataSourceBanner = new MatTableDataSource<Banner>(this.banners);
      this.dataSourceBanner._updateChangeSubscription();
      console.log(this.banners);
      this.dataSourceBanner.paginator = this.paginator;
      this.loading = false;
    });
  }
  getCampaignData(query: any, page: any, size: any, previousSize?: any) {
    this.loading = true;
    this.dataService.getAllCampaign(query, page, size).subscribe(res => {
      this.campaigns.length = 0 // previousSize;
      this.campaigns.push(...res.response.campaignList);
      this.campaigns.length = res.response.campaignList.length //res.response.totalItems;
      this.dataSourceCampaign = new MatTableDataSource<Banner>(this.campaigns);
      this.dataSourceCampaign._updateChangeSubscription();
      console.log(this.campaigns);
      this.dataSourceCampaign.paginator = this.paginator;
      this.loading = false;
    });
  }
  close() {
    this.alertMsg.message = ''
  }
  applyFilter() {

  }
  clearSearch() {

  }
  openAddDialog() {
    let size = ['675px', '475px'];
    if (window.innerWidth > 786) {
      size = ['695px', '600px'];
    } else {
      size = ['350px', '400px'];
    }
    if(this.currentTabIndex == 0){
      const dialogRef1 = this.dialog.open(AddCampaignModalComponent, {
        maxWidth: size[0],
        maxHeight: size[1],
        height: '100%',
        width: '100%',
        data: {},
        disableClose: false
      });
      dialogRef1.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
        this.getCampaignData(this.currentQuery, this.pagination.pageSize, this.pagination.length);
      });
    }else if(this.currentTabIndex == 1){
      const dialogRef2 = this.dialog.open(AddBannerModalComponent, {
        maxWidth: size[0],
        maxHeight: size[1],
        height: '100%',
        width: '100%',
        data: {},
        disableClose: false
      });
      dialogRef2.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
        this.getBannerData(this.currentQuery, this.pagination.pageSize, this.pagination.length);
      });
    }
  }
  openEditDialog(data:any) {
    let size = ['675px', '475px'];
    if (window.innerWidth > 786) {
      size = ['695px', '600px'];
    } else {
      size = ['350px', '400px'];
    }
    if(this.currentTabIndex == 0){
      const dialogRef1 = this.dialog.open(AddCampaignModalComponent, {
        maxWidth: size[0],
        maxHeight: size[1],
        height: '100%',
        width: '100%',
        data: {data},
        disableClose: false
      });
      dialogRef1.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
        this.getCampaignData(this.currentQuery, this.pagination.pageSize, this.pagination.length);
      });
    }else if(this.currentTabIndex == 1){
      const dialogRef2 = this.dialog.open(AddBannerModalComponent, {
        maxWidth: size[0],
        maxHeight: size[1],
        height: '100%',
        width: '100%',
        data: {data},
        disableClose: false
      });
      dialogRef2.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
        this.getBannerData(this.currentQuery, this.pagination.pageSize, this.pagination.length);
      });
    }
  }
  tabChanged(index: number): void {
    this.currentTabIndex = index;
  }
  deleteMultipleRecords() {

  }
  pageChanged(eve: any) {

  }
 
  deleteBanner(bannerId: number, index: number) {
    if(confirm('Want to delete?')){
      this.dataService.deleteBanner({ bannerId: bannerId }).subscribe(res => {
        console.log(res.responseCode);
        if (res.responseCode == 0) {
          this.dataSourceBanner.data.splice(index, 1);
          this.dataSourceBanner._updateChangeSubscription();
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
  toggleBannerStatus(banner: any) {
    if (banner.status == 'active') {
      this.dataService.disableBanner({ bannerId: banner.bannerId }).subscribe(res => {
        console.log(res);
        this.getBannerData(this.currentQuery, this.pagination.pageSize, this.pagination.length);
        //this.getNextData({}, this.pagination.pageSize, this.pagination.length, 0);
      })
    } else {
      this.dataService.enableBanner({ bannerId: banner.bannerId }).subscribe(res => {
        console.log(res);
        this.getBannerData(this.currentQuery, this.pagination.pageSize, this.pagination.length);
        //this.getNextData({}, this.pagination.pageSize, this.pagination.length, 0);
      })
    }
  }
  toggleCampaignStatus(campaign: any){
    if (campaign.status == 'active') {
      this.dataService.disableCampaign({ campaignId: campaign.campaignId }).subscribe(res => {
        console.log(res);
        this.getCampaignData(this.currentQuery, this.pagination.pageSize, this.pagination.length);
        //this.getNextData({}, this.pagination.pageSize, this.pagination.length, 0);
      })
    } else {
      this.dataService.enableCampaign({ campaignId: campaign.campaignId }).subscribe(res => {
        console.log(res);
        this.getCampaignData(this.currentQuery, this.pagination.pageSize, this.pagination.length);
        //this.getNextData({}, this.pagination.pageSize, this.pagination.length, 0);
      })
    }
  }
}
