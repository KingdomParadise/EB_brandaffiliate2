import { Component, OnInit } from '@angular/core';
let multi = [
  {
    "name": "Germany",
    "series": [
      {
        "name": "1990",
        "value": 10
      },
      {
        "name": "2010",
        "value": 5
      },
      {
        "name": "2011",
        "value": 12
      }
    ]
  }
];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  alertMsg: any = {
    type: '',
    message: ''
  };
  //chart vars below
  
  multi:any[];
  view: any[] = [400, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Count';
  timeline: boolean = true;

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
  single2 = [
    {
      "name": "1",
      "value": 56
    },
    {
      "name": "2",
      "value": 44
    },
    {
      "name": "3",
      "value": 34
    },
    {
      "name": "4",
      "value": 75
    },
    {
      "name": "5",
      "value": 32
    } ,
    {
      "name": "6",
      "value": 50
    },{
      "name": "7",
      "value": 45
    }
  ];
  constructor() { }

  ngOnInit(): void {
    Object.assign(this, {multi});
  }

  close() {

  }
}
