import { Component, OnInit } from '@angular/core';
import { WebConstants } from 'src/app/util/web.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-side-menu',
  templateUrl: './left-side-menu.component.html',
  styleUrls: ['./left-side-menu.component.scss']
})
export class LeftSideMenuComponent implements OnInit {

  public currentRoute :any;
  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
    this.currentRoute = WebConstants.WEB_URL.REPORT;
  }

  onMenuSelect(routeVal: string){
    this.currentRoute = routeVal;
    console.log("comparision ",{"routeVal":routeVal, "router.url":this.router.url});
  }

}
