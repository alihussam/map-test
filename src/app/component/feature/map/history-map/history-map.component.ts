import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-history-map",
  templateUrl: "./history-map.component.html",
  styleUrls: ["./history-map.component.scss"],
})
export class HistoryMapComponent implements OnInit {
  isShow = false;
  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  mapView = "satellite";
  mapType = "satellite";
  mapZoom = 19;
  maplat = 34.062661;
  maplng = -84.16737;
  myw = 15;
  myh = 15;
  lblsize = "7px"; //'13px';

  origin = { lat: 34.062856, lng: -84.166706 };
  destination = { lat: 34.067305, lng: -84.165711 };
  waypoints = [
     {location: { lat: 34.063295, lng:  -84.166428 }}, //Road
     {location: { lat: 34.063358, lng: -84.164843 }}, //Road
     {location: { lat: 34.064242, lng: -84.164896 }}, //Road
     {location: { lat: 34.065516, lng: -84.164195 }}, //FootPath
     {location: { lat: 34.066143, lng: -84.163160 }}, //Road
     {location: { lat: 34.066698, lng: -84.165032 }}, //FootPath
  ];
  
  constructor() {}

  ngOnInit(): void {
    this.mapType = "satellite";
  }

  bale(event) {
    if (event == 21) {
      this.lblsize = "11px"; //'13px';

      this.myh = 25;
      this.myw = 25;
    } else if (event == 20) {
      this.lblsize = "9px"; //'13px';

      this.myh = 30;
      this.myw = 30;
    } else if (event == 19) {
      this.lblsize = "7px"; //'13px';

      this.myh = 15;
      this.myw = 15;
    } else if (event == 18) {
      this.lblsize = "3px"; //'13px';

      this.myh = 4;
      this.myw = 4;
    } else if (event == 17) {
      this.lblsize = "2px"; //'12px';

      this.myh = 1;
      this.myw = 1;
    }
    if (event == 16) {
      this.lblsize = "1px";

      this.myh = 5;
      this.myw = 5;
    }
    if (event < 16) {
      this.lblsize = "0px";
      this.myh = 0;
      this.myw = 0;
    }
  }

  wt(evt) {
    this.mapType = evt;
  }
}
