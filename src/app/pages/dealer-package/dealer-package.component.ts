import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dealer-package',
  templateUrl: './dealer-package.component.html',
  styleUrls: ['./dealer-package.component.css']
})
export class DealerPackageComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToNextPage(){
    this.router.navigateByUrl('/dealer-login')
  }
}
