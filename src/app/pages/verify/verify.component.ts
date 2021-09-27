import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit{

  constructor(public router: Router){

  }
  ngOnInit(){

  }
  onSubmit(){
    this.router.navigateByUrl('/review');
  }
}
