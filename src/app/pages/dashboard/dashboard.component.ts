import { Component, OnInit } from '@angular/core';
import { InitialDataService } from 'src/app/services/initial-data.service';
import { DatePipe } from '@angular/common';
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
  series = [
    {
      "name": "Retired",
      "value": 20,
      "label": "20%"
    },
    {
      "name": "Employed",
      "value": 70,
      "label": "70%"
    },
    {
      "name": "Unemployed",
      "value": 10,
      "label": "10%"
    }
  ];
  
  constructor(private dataService: InitialDataService,private datePipe: DatePipe) { }

  ngOnInit(): void {
    
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
      console.log(barGraph);
      Object.assign(this, {barGraph});
    })

  }

  close() {

  }
}
