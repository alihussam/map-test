import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenStorage } from 'src/app/util/token.storage';
import { GeofenceDetailService } from 'src/app/services/geofence-detail.service';
import { first } from 'rxjs/operators';
import { WebConstants } from 'src/app/util/web.constants';
import { ParkingSpotService } from 'src/app/services/parking-spot.service';
import { timeConvertByMinutes } from 'src/app/util/web.util';

@Component({
  selector: 'app-geofence-map',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {

  mapView = "satellite";
  mapType = "satellite";
  mapZoom= 19;
  maplat = 27.68886;
  maplng = -82.73686;
  myw = 15;
  myh = 15;
  lblsize='7px';//'13px';
  polygonData:any = {
    "strokeColor" : "#BBBAD2",
    "strokeOpacity" : 0.2,
    "strokeWeight" : 2,
    "fillColor" : "#BBBAD2",
    "fillOpacity" : 0.35,
    "draggable" : false,
    "editable" : false,
    "visible" : true,
    "ZonePaths": []
  }
  public parkingspotMarkers: any = [];
  iconUrl='';
  
  constructor(
    private geofenceDetailService: GeofenceDetailService,
    private tokenStorage: TokenStorage,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private parkingSpotService: ParkingSpotService
  ) { }

  ngOnInit(): void {
    this.mapType ="satellite";
    const geofenceId: any = this.activatedRoute.snapshot.queryParamMap.get('geofenceId');
    if(geofenceId){
      this.getAllGeofenceDetialByID(geofenceId);
    }else{
      const binSpotId: any = this.activatedRoute.snapshot.queryParamMap.get('binSpotId');
      if(binSpotId){
        this.findParkingSpotById(binSpotId, true);
      }
    }
  }

  onMouseOver(infoWindow,evt){
    infoWindow.open();
   }

   onMouseOut(infoWindow, $event: MouseEvent) {
    infoWindow.close();
   }

  getAllGeofenceDetialByID(geofenceId: any) {
    this.geofenceDetailService.GeofenceDetailFindByGeofenceId(geofenceId)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          let allGeofenceDetails = response.data;
          let ZonePaths: any = []; 
          let lat, lng;
          allGeofenceDetails.map(geofenceDetail => {
            ZonePaths.push({lat: geofenceDetail.latitude, lng: geofenceDetail.longitude})
            lat = geofenceDetail.latitude;
            lng = geofenceDetail.longitude;
          })
          this.polygonData.ZonePaths = ZonePaths;
          this.maplat = lat;
          this.maplng = lng;
          console.log("response geofence detail ", response.data);
         
        } else {
          this.toastrService.error(response.value,"Failed To Load Data!")
        }
      });
  }

  bale(event)
  {
     if(event ==21)
     {
       this.lblsize = '11px'//'13px';
 
       this.myh = 25;
       this.myw = 25;
 
     }
     else 
     if(event ==20)
    {
      this.lblsize = '9px'//'13px';

      this.myh = 30;
      this.myw = 30;

    }
    else 
     if(event ==19)
    {
      this.lblsize = '7px';//'13px';

      this.myh = 15;
      this.myw = 15;

    }
    else 
    if(event ==18)
    {
      this.lblsize = '3px';//'13px';

      this.myh = 4;
      this.myw = 4;

    }
    else 
    if(event ==17)
    {
      this.lblsize = '2px';//'12px';

      this.myh = 1;
      this.myw = 1;

    }
    if(event ==16)
    {
      this.lblsize = '1px';

      this.myh =  5;
      this.myw =  5;

    }
    if(event< 16)
    { 
     this.lblsize = '0px';
      this.myh = 0;
      this.myw = 0;
    }
  }

  wt(evt) { 
    this.mapType= evt;
  }

  polyclick($event){
    console.log("poly click ",$event);
  }

  findParkingSpotById(parkingspotId, isFocused: boolean){
    this.parkingSpotService.findParkingSpotById(parkingspotId)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
            let tempParkingSpotMarkers = [];  
            let parkingSpotObject = response.data;
            let colorCode = "#FFFFFF";
            let iconUrl = "";
            let label = " ";

            if(parkingSpotObject.markerIcon == WebConstants.BIN_STATUS.FULL){
              iconUrl = "assets/images/red.png";
            }
            else if(parkingSpotObject.markerIcon == WebConstants.BIN_STATUS.EMPTY ){
              iconUrl = "assets/images/green.png";

            }
            else if (parkingSpotObject.markerIcon == WebConstants.BIN_STATUS.HALF_FULL){
              iconUrl = "assets/images/orange.png";
            }
            else {
              iconUrl = "assets/images/red.png";
            }

            let parkingSpot = {
              lat: parkingSpotObject.latitude - 0.000016,
              lng: parkingSpotObject.longitude,
              spotName: parkingSpotObject.spotName,
              sensorName: parkingSpotObject.sensorName,
              parkingSpotActivity: parkingSpotObject.parkingSpotActivity,
              occupyStatus: parkingSpotObject.occupyStatus,
              occupancy: parkingSpotObject.occupyStatus,
              occupiedDuration: parkingSpotObject.occupiedDuration,
              color: colorCode,
              iconUrl: iconUrl,
              label: label,
              statusOccupied: parkingSpotObject.statusOccupied,
              numberOfTrn: parkingSpotObject.numberOfTrn,
              devEui : parkingSpotObject.devEUI,
              height :parkingSpotObject.height, 
              status : parkingSpotObject.trashCanStatus,
              date_time : parkingSpotObject.deviceDatetime,
              elasp_time : timeConvertByMinutes(parkingSpotObject.elaspTime),
              level : parkingSpotObject.levelStatus
            }

            this.parkingspotMarkers = [parkingSpot];
            this.maplat = parkingSpot.lat;
            this.maplng = parkingSpot.lng;
           
        } else {
          this.toastrService.error(response.value,"Failed To Get Parking Spot Data!")
        }
      });
  }

}
