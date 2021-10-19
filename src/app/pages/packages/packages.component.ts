import { Component, OnInit } from '@angular/core';
import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {

  constructor(private dataService: InitialDataService,) { }

  ngOnInit(): void {
    this.dataService.packageDetails().subscribe( (res:any) =>{
      console.log(res);
    })
  }

}
