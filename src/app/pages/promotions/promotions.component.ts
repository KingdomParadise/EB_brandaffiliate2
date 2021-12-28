import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { InitialDataService } from 'src/app/services/initial-data.service';
import { AddBannerModalComponent } from './add-banner-modal/add-banner-modal.component';
import { AddCampaignModalComponent } from './add-campaign-modal/add-campaign-modal.component';
import { NgxSpinnerService } from "ngx-spinner";
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
  loadingAction = true;
  pagination = {
    pageSize: 0,
    length: 5,
  };
  paginationBanner = {
    pageSize: 0,
    length: 5,
  };
  currentTabIndex = 0;
  banners: any[] = [];
  campaigns: any[] = [];
  selection = new SelectionModel<Banner>(true, []);
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('campaignPaginator') campaignPaginator: MatPaginator;
  @ViewChild('bannerPaginator') bannerPaginator: MatPaginator;
  
  @ViewChild('tabGroup') tabGroup: any;
  currentQuery: any = {
    searchString: '',
  };
  filterText = '';
  displayedColumns: string[] = ['duration', 'title', 'image', 'status', 'action'];
  dataSourceBanner = new MatTableDataSource<Banner>([]);
  dataSourceCampaign = new MatTableDataSource<Banner>([]);
  constructor(
    public dialog: MatDialog,
    private dataService: InitialDataService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getBannerData(this.currentQuery, this.paginationBanner.pageSize, this.paginationBanner.length, 0);
    this.getCampaignData(this.currentQuery, this.pagination.pageSize, this.pagination.length, 0);

  }
  getBannerData(query: any, page: any, size: any, previousSize?: any) {
    this.spinner.show();
    this.dataService.getAllBanner(query, page, size).subscribe(res => {
      this.banners.length = previousSize || 0;
      this.banners.push(...res.response.bannerList);
      this.banners.length = res.response.totalItems;
      this.dataSourceBanner = new MatTableDataSource<Banner>(this.banners);
      this.dataSourceBanner._updateChangeSubscription();
      console.log(this.banners);
      this.dataSourceBanner.paginator = this.bannerPaginator;
      this.spinner.hide();
    });
  }
  getCampaignData(query: any, page: any, size: any, previousSize?: any) {
    this.dataService.getAllCampaign(query, page, size).subscribe(res => {
      console.log("prev size =>", previousSize);
      this.campaigns.length = previousSize || 0;
      this.campaigns.push(...res.response.campaignList);
      this.campaigns.length = res.response.totalItems;
      this.dataSourceCampaign = new MatTableDataSource<Banner>(this.campaigns);
      this.dataSourceCampaign._updateChangeSubscription();
      console.log(this.campaigns);
      this.dataSourceCampaign.paginator = this.campaignPaginator;
    });
  }
  close() {
    this.alertMsg.message = ''
  }

  applyFilter() {
    this.currentQuery = {
      searchString: this.filterText
    }
    if (this.currentTabIndex == 0) {
      this.getCampaignData(this.currentQuery, this.pagination.pageSize, this.pagination.length, 0);
    } else {
      this.getBannerData(this.currentQuery, this.paginationBanner.pageSize, this.paginationBanner.length, 0);
    }
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
    if (this.currentTabIndex == 0) {
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
        this.getCampaignData(this.currentQuery, this.pagination.pageSize, this.pagination.length, 0);
      });
    } else if (this.currentTabIndex == 1) {
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
        this.getBannerData(this.currentQuery, this.paginationBanner.pageSize, this.paginationBanner.length);
      });
    }
  }
  openEditDialog(data: any) {
    let size = ['675px', '475px'];
    if (window.innerWidth > 786) {
      size = ['695px', '600px'];
    } else {
      size = ['350px', '400px'];
    }
    if (this.currentTabIndex == 0) {
      const dialogRef1 = this.dialog.open(AddCampaignModalComponent, {
        maxWidth: size[0],
        maxHeight: size[1],
        height: '100%',
        width: '100%',
        data: { data },
        disableClose: false
      });
      dialogRef1.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
        this.getCampaignData(this.currentQuery, this.pagination.pageSize, this.pagination.length, 0);
      });
    } else if (this.currentTabIndex == 1) {
      const dialogRef2 = this.dialog.open(AddBannerModalComponent, {
        maxWidth: size[0],
        maxHeight: size[1],
        height: '100%',
        width: '100%',
        data: { data },
        disableClose: false
      });
      dialogRef2.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
        this.getBannerData(this.currentQuery, this.paginationBanner.pageSize, this.paginationBanner.length);
      });
    }
  }
  tabChanged(index: number): void {
    this.currentTabIndex = index;
  }
  deleteMultipleRecords() {

  }

  deleteBanner(bannerId: number, index: number) {
    if (confirm('Want to delete?')) {
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
    } else {

    }
  }
  deleteCampaign(campaignId: number, index: number) {
    if (confirm('Want to delete?')) {
      this.dataService.deleteCampaign({ campaignId: campaignId }).subscribe(res => {
        console.log(res.responseCode);
        if (res.responseCode == 0) {
          this.dataSourceCampaign.data.splice(index, 1);
          this.dataSourceCampaign._updateChangeSubscription();
        } else if (res.responseCode == -1) {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = res.errorMsg
        } else {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = "Server error"
        }
      });
    } else {

    }
  }
  toggleBannerStatus(banner: any) {
    if (banner.status == 'active') {
      this.dataService.disableBanner({ bannerId: banner.bannerId }).subscribe(res => {
        console.log(res);
        this.getBannerData(this.currentQuery, this.paginationBanner.pageSize, this.paginationBanner.length);
      })
    } else {
      this.dataService.enableBanner({ bannerId: banner.bannerId }).subscribe(res => {
        console.log(res);
        this.getBannerData(this.currentQuery, this.paginationBanner.pageSize, this.paginationBanner.length);
      })
    }
  }
  toggleCampaignStatus(campaign: any) {
    if (campaign.status == 'active') {
      this.dataService.disableCampaign({ campaignId: campaign.campaignId }).subscribe(res => {
        this.getCampaignData(this.currentQuery, this.pagination.pageSize, this.pagination.length, 0);
      })
    } else {
      this.dataService.enableCampaign({ campaignId: campaign.campaignId }).subscribe(res => {
        this.getCampaignData(this.currentQuery, this.pagination.pageSize, this.pagination.length);
      })
    }
  }

  pageChanged(event: any) {

    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;

    let previousIndex = event.previousPageIndex;

    let previousSize = pageSize * pageIndex;
    // let query = {
    //   type: 'all',
    //   sort: '',
    //   searchString: '',
    // }
    //this.getNextData(this.currentQuery, pageIndex.toString(), pageSize, previousSize);
    if (this.currentTabIndex == 0) {
      this.pagination.pageSize = pageIndex;
      this.pagination.length = pageSize;
      this.getCampaignData(this.currentQuery, pageIndex.toString(), this.pagination.length, previousSize);
    } else {
      this.paginationBanner.pageSize = pageIndex;
      this.paginationBanner.length = pageSize;
      this.getBannerData(this.currentQuery, pageIndex.toString(), this.paginationBanner.length, previousSize);
    }
  }
}
