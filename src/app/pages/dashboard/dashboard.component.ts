import { Component, OnInit } from '@angular/core';
import { InitialDataService } from 'src/app/services/initial-data.service';
import { DatePipe } from '@angular/common';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Router } from '@angular/router';
let multi:any[] = [
  {
    "name": "Shared",
    "series": [
      
    ]
  }
];
let barGraph:any[] = [
    
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {
  alertMsg: any = {
    type: '',
    message: ''
  };
  apiData: any;
  newAffiliates:any[] = [];
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  galleryOptionsBanner: NgxGalleryOptions[];
  galleryImagesBanner: NgxGalleryImage[];
  activeCampaignName = '';
  activeBannerName = '';
  //chart vars below
  
  multi:any[];
  barGraph:any[];
  view: any[] = [400, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  yAxisLabel: string = 'Count';
  timeline: boolean = true;
  lineChartData:any[] = [];

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  //pie chart vars
  campaignDonut:any[] =[];
  bannerDonut:any[] =[];
 
  
  constructor(private dataService: InitialDataService,private datePipe: DatePipe, private router:Router) { }

  ngOnInit(): void {
    
    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [
      
    ];
    
    this.galleryOptionsBanner = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImagesBanner = [
      
    ];
    this.dataService.getDealerDashboard().subscribe( (res:any) =>{
      this.apiData = res.response;
      this.newAffiliates = res.response.newAffiliates;
      for(let i = 0; i< this.apiData.contentShared.length; i++){
        let obj = {
          name: this.datePipe.transform(this.apiData.contentShared[i].createTs, 'shortDate'),
          value: this.apiData.contentShared[i].count
        }
        this.lineChartData.push(obj);
      }
      //console.log(this.lineChartData);
      multi[0]['series'] = this.lineChartData;
      
      Object.assign(this, {multi});
      for(let i = 0; i< this.apiData.affiliatePerformance.length; i++){
        let obj = {
          name: this.datePipe.transform(this.apiData.affiliatePerformance[i].createTs, 'shortDate'),
          value: this.apiData.affiliatePerformance[i].count
        }
        barGraph.push(obj);
      }
      Object.assign(this, {barGraph});
    
      let arr = [
        {
          name: ' Total Shares',
          value: this.apiData?.campaignsPerformace[0].totalShares
        },
        {
          name: ' Total Leads',
          value: this.apiData.campaignsPerformace[0].totalLeads
        },
        {
          name: ' Total Views',
          value: this.apiData.campaignsPerformace[0].totalViews
        },
      ]
      this.campaignDonut = [...this.campaignDonut, ...arr];

      let arr2 = [
        {
          name: ' Total Shares',
          value: this.apiData.bannerPerformance[0].totalShares
        },
        {
          name: ' Total Leads',
          value: this.apiData.bannerPerformance[0].totalLeads
        },
        {
          name: ' Total Views',
          value: this.apiData.bannerPerformance[0].totalViews
        },
      ]
      this.bannerDonut = [...this.bannerDonut, ...arr2];


      this.galleryOptions[0].thumbnailsColumns = this.apiData.campaignsPerformace.length;
      this.activeCampaignName = this.apiData.campaignsPerformace[0].campaignName;
    
      this.galleryImages = this.apiData.campaignsPerformace.map(item => {
        return {
          small: item.campaignImageLink,
          medium: item.campaignImageLink,
          big: item.campaignImageLink
        }
      });

      this.galleryOptionsBanner[0].thumbnailsColumns = this.apiData.bannerPerformance.length;
      this.activeBannerName = this.apiData.bannerPerformance[0].bannerName;
     
      this.galleryImagesBanner = this.apiData.bannerPerformance.map(item => {
        return {
          small: item.bannerImageLink,
          medium: item.bannerImageLink,
          big: item.bannerImageLink
        }
      });
    })

    
  }
  onCampaignImageChange(ev:any){
    this.campaignDonut = [];
    this.activeCampaignName = this.apiData.campaignsPerformace[ev.index].campaignName;
    let arr = [
      {
        name: ' Total Shares',
        value: this.apiData.campaignsPerformace[ev.index].totalShares
      },
      {
        name: ' Total Leads',
        value: this.apiData.campaignsPerformace[ev.index].totalLeads
      },
      {
        name: ' Total Views',
        value: this.apiData.campaignsPerformace[ev.index].totalViews
      },
    ]
    this.campaignDonut = [...this.campaignDonut, ...arr];
  }

  onBannerImageChange(ev:any){
    this.bannerDonut = [];
    this.activeBannerName = this.apiData.bannerPerformance[ev.index].bannerName;
    let arr = [
      {
        name: ' Total Shares',
        value: this.apiData.bannerPerformance[ev.index].totalShares
      },
      {
        name: ' Total Leads',
        value: this.apiData.bannerPerformance[ev.index].totalLeads
      },
      {
        name: ' Total Views',
        value: this.apiData.bannerPerformance[ev.index].totalViews
      },
    ]
    this.bannerDonut = [...this.bannerDonut, ...arr];
  }
  close() {

  }
  goToAffiliates(){
    this.router.navigateByUrl('/affiliates')
  }
}
