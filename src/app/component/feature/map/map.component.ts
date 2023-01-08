import { DatePipe } from "@angular/common";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { en_US, NzI18nService } from "ng-zorro-antd/i18n";
import { ToastrService } from "ngx-toastr";
import { first } from "rxjs/operators";
import { MapService } from "src/app/services/map.service";
import { timeConvertByMinutes } from "src/app/util/web.util";
import { WebConstants } from "../../../util/web.constants";
import { WebSocketConfiguration } from "../../../websocket/websocket.configuration";
import { CurrentExpiredSessionDialogComponent } from "./current-expired-session-dialog/current-expired-session-dialog.component";
import { PastExpiredSessionDialogComponent } from "./past-expired-session-dialog/past-expired-session-dialog.component";
import { BinSpotColorService } from "src/app/services/bin.spot.color.service";
import { TokenStorage } from "src/app/util/token.storage";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {
  [x: string]: any;

  @ViewChild("search")
  public searchElementRef: ElementRef;
  public allStatusFilters: any = [
    { name: "ALL", value: "ALL" },
    { name: "FULL", value: "FULL" },
    { name: "EMPTY", value: "EMPTY" },
    { name: "PARTIAL", value: "HALF_FULL" },
  ];
  public selectedStatusFilter = "FULL";
  public searchControl: FormControl;

  public latlong: any = {};

  //////////////////////
  public mapView = "satellite";
  public selectedMarkerType = "marker";

  public mapZoom = 18;

  public myw = 25;
  public myh = 25;
  public lblsize = "7px"; // '13px';
  public mapType = "satellite";
  //  public mapLat = 27.68886;
  //  public mapLng = -82.73686;
  public mapLat = 27.68892;
  public mapLng = -82.737648;

  public now: Date = new Date();

  public messageHandlerCallback: Function;
  public paylaodMessage = { data: "" };
  public binSpotMarkers: any[] = [];

  public currentExpiredSessionList: any[] = [];
  public noEventSessionList: any[] = [];
  public noEventSessionListObject: any[] = [];

  public currentExpiredSessionFilteredList: any[] = [];
  public pastExpiredSessionList: any[] = [];
  public currentExpiredSessionObjects: any[] = [];
  public pastExpiredSessionObjects: any[] = [];
  public binSpotResponseList: any[] = [];

  public liveSessionList: any[] = [];
  public todaySessionList: any[] = [];
  public spotPaymentList: any[] = [];

  public ngZoroSize = "default";
  public pastSessionDateRange: any[] = [];

  public binSpotColorList: any[] = [];

  public pastSessionStartDate: string = null;
  public pastSessionEndDate: string = null;
  public currentTab: string = WebConstants.MAP_TAB.CURRENT_SESSION;

  public markerMapObject = new Map();
  public focusedDevEui = "";

  constructor(
    public mapService: MapService,
    private toastrService: ToastrService,
    private webSocketConfiguration: WebSocketConfiguration,
    public matDialog: MatDialog,
    public datePipe: DatePipe,
    private i18n: NzI18nService,
    public binSpotColorService: BinSpotColorService,
    public tokenStorage: TokenStorage
  ) {
    this.i18n.setLocale(en_US);
    // console.log(this.now);
  }

  ngOnInit() {
    this.mapType = "satellite";
    // this.selectedStatusFilter = this.allStatusFilters[0].name;
    // this.createWebSocketConnections();
    this.getAllBinSpotColorByOrg(this.tokenStorage.getOrganizationId());
    this.getAllParkingSpot(true);
    //this.getCurrentSessions();
    // this.getInactive();

    setTimeout(() => {
      console.log(" in setTimout fetching map current session");
      this.getCurrentSessions();
    }, 2000);

    this.intervalId = setInterval(() => {
      // console.log("fetching map component data")
      this.getCurrentSessions();
      // this.getPastSessions();
      this.getAllParkingSpot(true);
      // this.displaySingleParkingSpot(true, '8CF95720000598BB');
    }, 15000); //15000
  }

  getAllBinSpotColorByOrg(organizationId: any): void {
    this.binSpotColorService
      .getAllByOrganization(this.tokenStorage.getOrganizationId())
      .pipe(first())
      .subscribe((response) => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          //this.binSpotColorList = response.data;
          this.binSpotColorList = response.data.filter(
            (object) => object.platformName === "WEB"
          );
          console.log(
            "response of bin spot color from array binSpotColorList  ",
            this.binSpotColorList
          );
          // }
          //  else {
          //   this.toastrService.error(response.value,"Failed To Load Data!")
          // }
        }
      });
  }

  getAllParkingSpot(isFocused: boolean): void {
    this.mapService
      .getAllParkingSpots()
      .pipe(first())
      .subscribe((response) => {
        this.updateMapMarker(response, isFocused);
      });

    //  if (this.currentTab === WebConstants.MAP_TAB.CURRENT_SESSION) {
    //   this.getCurrentSessions();
    // } else if (this.currentTab === WebConstants.MAP_TAB.PAST_SESSION) {
    //   this.getPastSessions();
    // } else if (this.currentTab === WebConstants.MAP_TAB.LIVE_SESSION) {
    //   this.getLiveSessions();
    // } else if (this.currentTab === WebConstants.MAP_TAB.TODAY_SESSION) {
    //   this.getTodaySessions();
    // }
  }

  updateMapMarker(response: any, isFocused: boolean): void {
    if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
      const mapObject = response.data;
      this.binSpotResponseList = mapObject;

      this.setFilteredMapMaker();
      // if (isFocused) {
      //   this.mapLat = latitude;
      //   this.mapLng = longitude;
      // }
    } else {
      this.toastrService.error("No result found");
    }
  }

  setFilteredMapMaker(): void {
    console.log("Bin spot list", JSON.stringify(this.binSpotResponseList));
    let binSpotList: any = [];
    this.markerMapObject = new Map();

    if (this.selectedStatusFilter === "ALL") {
      binSpotList = this.binSpotResponseList;
    } else {
      binSpotList = this.binSpotResponseList.filter(
        (object) => object.trashCanStatus === this.selectedStatusFilter
      );
    }

    for (let i = 0; i < binSpotList.length; i++) {
      const binSpotObject = binSpotList[i];
      this.markerMapObject.set(
        binSpotObject.spotName,
        this.fillMapMarkerObject(binSpotObject)
      );
    }

    this.binSpotMarkers = [];
    this.binSpotMarkers = this.getKeys(this.markerMapObject);
    console.log("bin sport markers", JSON.stringify(this.binSpotMarkers));
  }

  fillMapMarkerObject(binSpotObject: any): Object {
    const colorCode = "#FFFFFF";
    let iconUrl = " ";
    let label = " ";

    // console.log("parkingSpotObject={}", parkingSpotObject);

    if (this.selectedMarkerType === "marker") {
      // iconUrl = "assets/images/" + parkingSpotObject.markerIcon + ".svg";

      iconUrl = this.createSvg(binSpotObject.markerIcon);
    } else {
      iconUrl = "assets/images/Rectangle_" + binSpotObject.markerIcon + ".svg";
      label = binSpotObject.spotName;
    }

    // console.log("latitude={}, longitude={}", parkingSpotObject.latitude, parkingSpotObject.longitude);

    const markerObject = {
      lat: binSpotObject.latitude - 0.000016,
      lng: binSpotObject.longitude,
      spotName: binSpotObject.spotName,
      sensorName: binSpotObject.sensorName,
      parkingSpotActivity: binSpotObject.parkingSpotActivity,
      occupyStatus: binSpotObject.occupyStatus,
      occupancy: binSpotObject.occupyStatus,
      occupiedDuration: binSpotObject.occupiedDuration,
      color: colorCode,
      iconUrl,
      label,
      statusOccupied: binSpotObject.statusOccupied,
      numberOfTrn: binSpotObject.numberOfTrn,
      devEui: binSpotObject.devEUI,
      height: binSpotObject.height,
      temperature: binSpotObject.temperature,
      status: binSpotObject.trashCanStatus,
      deviceDatetime: binSpotObject.deviceDatetime,
      elaspTime: timeConvertByMinutes(binSpotObject.elaspTime),
      level: binSpotObject.levelStatus,
      fillPercent: binSpotObject.fillPercent,
      markerIcon: binSpotObject.markerIcon,
    };

    return markerObject;
  }

  focusOnLatLng(data: any) {
    if (data != null) {
      const locationArr = data.split(",");
      if (locationArr.length === 2) {
        const latitude: number = +locationArr[0];
        const longitude: number = +locationArr[1];

        if (!isNaN(latitude) && !isNaN(longitude)) {
          this.maplat2 = latitude;
          this.maplng2 = longitude;
          let iconUrl = " ";
          iconUrl = "assets/images/marker.png";

          const object = {
            lat: this.maplat2,
            lng: this.maplng2,
            iconUrl,
          };

          for (let x = 0; x < this.parkingspotMarkers.length; x++) {
            this.parkingspotMarkers[x] = object;
          }

          //   for(let x = 0 ; x < this.latlongs.length ;x++){

          //     this.latlongs[x] = object
          // }
        } else {
          this.toastrService.info(
            "Please Enter Location in correct Format",
            "Invalid"
          );
        }
      }
    } else {
      this.toastrService.info(
        "Please Enter Location in correct Format",
        "Invalid"
      );
    }
    // this. getAllParkingSpot(true);
  }

  /////////////////////////

  setMarkerOnImage(): void {
    const img = document.getElementById("structureImage");
    const imgWidth = img.clientWidth;
    const imgHeight = img.clientHeight;
    console.log("===================================");
    console.log("ImgWidth", imgWidth);
    console.log("ImgHeight", imgHeight);
    console.log("===================================");
  }

  wt(evt: any): void {
    this.mapType = evt;
  }

  markerType(evt: any): void {
    this.selectedMarkerType = evt;
    this.parkingSpotMarkers = this.binSpotMarkerTypeWrtToggle();
    // this.parkingspotMarkers2 = this.parkingSpotMarkerTypeWrtToggle();
  }

  // bale(event: any): void {
  //   if (event === 20) {
  //     if (this.selectedMarkerType === 'marker') {
  //       this.lblsize = '9px'; // '13px';
  //       this.myh = 15;
  //       this.myw = 15;
  //     } else {
  //       this.myw = 25;
  //       this.lblsize = '9px';
  //       this.myh = 15;
  //     }
  //   } else if (event === 19) {
  //     if (this.selectedMarkerType === 'marker') {
  //       this.lblsize = '7px'; // '13px';
  //       this.myh = 10;
  //       this.myw = 10;
  //     } else {
  //       this.myw = 23;
  //       this.lblsize = '8px';
  //       this.myh = 15;
  //     }
  //   } else if (event == 18) {
  //     this.lblsize = '3px'; // '13px';
  //     this.myh = 7;
  //     this.myw = 7;
  //   } else if (event == 17) {
  //     this.lblsize = '2px'; // '12px';
  //     this.myh = 3;
  //     this.myw = 3;
  //   }

  //   if (event == 16) {
  //     this.lblsize = '1px';
  //     this.myh = 3;
  //     this.myw = 3;
  //   }

  //   if (event < 16) {
  //     this.lblsize = '0px';
  //     this.myh = 0;
  //     this.myw = 0;
  //   }
  // }

  //////////////////

  ///////////
  selectMarker(binSpotMarker: any, event: any): void {
    // console.log("searchBySelectMarker, {}", binSpotMarker.devEui);
    // this.searchByFilter(binSpotMarker.devEui);
  }

  // searchByFilter(filter: any) {
  //   this.currentExpiredSessionList = this.currentExpiredSessionObjects.filter(
  //     (object) => ((object.devEui !== undefined && object.devEui.startsWith(filter)))
  //   );
  //
  //   this.getFilteredSession(this.selectedStatusFilter, true);
  // }

  onMouseOver(infoWindow: any, evt: any): void {
    infoWindow.open();
  }

  onMouseOut(infoWindow: any, $event: MouseEvent): void {
    infoWindow.close();
  }

  deFocusMap($event: MouseEvent): void {
    this.focusedDevEui = "";
  }

  getCurrentSessions(): void {
    this.currentTab = WebConstants.MAP_TAB.CURRENT_SESSION;

    this.mapService
      .getCurrentSessions()
      .pipe(first())
      .subscribe((response) => {
        // console.log("getCurrentSessions.response.data={}", response.data);
        // console.log('currentExpiredSessionObjects', response.data);

        if (response.code === WebConstants.STATUS.CODE_SUCCESS) {
          if (response.data && response.data.length > WebConstants.INT_ZERO) {
            this.currentExpiredSessionObjects = response.data;

            console.log(
              "currentExpiredSessionObjects",
              this.currentExpiredSessionObjects
            );

            for (var i = 0; i < this.currentExpiredSessionObjects.length; i++) {
              if (
                this.currentExpiredSessionObjects[i].trashCanStatus ===
                "HALF_FULL"
              )
                this.currentExpiredSessionObjects[i].statusColor =
                  this.binSpotColorList[0].partialFullColor;
              // Add "total": 2 to all objects in array
              else if (
                this.currentExpiredSessionObjects[i].trashCanStatus === "FULL"
              )
                this.currentExpiredSessionObjects[i].statusColor =
                  this.binSpotColorList[0].fullColor;
              else if (
                this.currentExpiredSessionObjects[i].trashCanStatus === "EMPTY"
              )
                this.currentExpiredSessionObjects[i].statusColor =
                  this.binSpotColorList[0].emptyColor;
            }

            this.currentExpiredSessionList = [];
            this.getFilteredSession(this.selectedStatusFilter, false);
            // this.currentExpiredSessionList = this.currentExpiredSessionObjects;
          } else {
            this.currentExpiredSessionObjects = [];
            this.currentExpiredSessionList = [];
          }
        }
      });
  }

  getInactive() {
    this.noEventSessionList = [];

    this.binSpotResponseList.map((x) => {
      console.log("binspot: " + x.devEUI);
      //console.log('this.currentExpiredSessionObjects: {}', this.currentExpiredSessionObjects);
      //console.log('no event data: {}', this.currentExpiredSessionObjects.find(y => y.devEui === x.devEUI));
      if (
        this.currentExpiredSessionObjects.find((y) => y.devEui === x.devEUI) ===
        undefined
      ) {
        let obj: any = {};
        obj.trashCanStatus = "No-Event";
        obj.spotName = x.spotName;
        obj.deviceDatetime = "";
        obj.devEui = x.devEUI;
        this.noEventSessionList.push(obj);
      }
    });
  }

  getFilteredSession(filter: any, isSearch: any): void {
    // console.log('getFilteredSession', filter);
    const tempCurrentExpiredSessionObjects: any[] =
      this.currentExpiredSessionObjects;

    if (isSearch) {
      this.currentExpiredSessionObjects = this.currentExpiredSessionList;
    }

    this.selectedStatusFilter = filter;
    if (filter === "ALL") {
      this.currentExpiredSessionList = this.currentExpiredSessionObjects;
    } else {
      this.currentExpiredSessionList = this.currentExpiredSessionObjects.filter(
        (object) => object.trashCanStatus === filter
      );
    }

    if (isSearch) {
      this.currentExpiredSessionObjects = tempCurrentExpiredSessionObjects;
    }

    // console.log('currentExpiredSessionList: {}', this.currentExpiredSessionList[0]);
    // console.log('binSpotResponseList: {}', this.binSpotResponseList[0]);
    // this.currentExpiredSessionList.map(x => {
    //     // let color = (this.binSpotResponseList.filter(y => x.devEUI === y.devEUI)[0]).markerIcon;
    //     console.log('Color Icon: {}', this.markerMapObject.get(x.spotName));
    //     // x.color = (this.binSpotMarkers.filter(y => x.devEUI === y.devEui)[0]).markerIcon;
    // });

    // this.binSpotResponseList.map(x => {
    //     console.log('binspot: ' + x.devEUI);
    //     // console.log('this.currentExpiredSessionObjects: {}', this.currentExpiredSessionObjects);
    //     // console.log('no event data: {}', this.currentExpiredSessionObjects.find(y => y.devEui === x.devEUI));
    //     if (this.currentExpiredSessionObjects.find(y => y.devEui === x.devEUI) === undefined){
    //         let obj: any = {};
    //         obj.trashCanStatus = 'No-Event';
    //         obj.spotName = x.spotName;
    //         obj.deviceDatetime = '';
    //         obj.devEui = x.devEUI;
    //         this.currentExpiredSessionList.push(obj);
    //     }
    //  });

    this.setFilteredMapMaker();
  }

  getPastSessionsByDateRange(event: any): void {
    this.pastSessionStartDate = this.getDateWithFormat(
      event[0],
      WebConstants.DATE.FORMAT_MM_DD_YYYY
    );
    this.pastSessionEndDate = this.getDateWithFormat(
      event[1],
      WebConstants.DATE.FORMAT_MM_DD_YYYY
    );

    const mapSessionSearchCriteria = {
      startDate: this.pastSessionStartDate,
      endDate: this.pastSessionEndDate,
    };

    this.getPastSessionList(mapSessionSearchCriteria);
  }

  getPastSessions(): void {
    this.pastSessionDateRange = null;

    this.pastSessionStartDate = this.getDateWithFormat(
      new Date(),
      WebConstants.DATE.FORMAT_MM_DD_YYYY
    );
    this.pastSessionEndDate = this.pastSessionStartDate;

    const mapSessionSearchCriteria = {
      startDate: this.pastSessionStartDate,
      endDate: this.pastSessionEndDate,
    };

    this.getPastSessionList(mapSessionSearchCriteria);
  }

  getPastSessionList(mapSessionSearchCriteria: any): void {
    this.currentTab = WebConstants.MAP_TAB.PAST_SESSION;

    this.mapService
      .getPastSessions(mapSessionSearchCriteria)
      .pipe(first())
      .subscribe((response) => {
        // console.log("getPastSessions.response.data={}", response.data);

        if (response.code === WebConstants.STATUS.CODE_SUCCESS) {
          if (response.data && response.data.length > WebConstants.INT_ZERO) {
            this.pastExpiredSessionObjects = response.data;

            this.pastExpiredSessionList = [];
            this.pastExpiredSessionList = this.pastExpiredSessionObjects;
          } else {
            this.pastExpiredSessionObjects = [];
            this.pastExpiredSessionList = [];
          }
        }
      });
  }

  displaySingleParkingSpot(isFocused: boolean, devEui: string): void {
    this.mapService
      .getSingleParkingSpotByDevEui(devEui)
      .pipe(first())
      .subscribe((response) => {
        if (response.code === WebConstants.STATUS.CODE_SUCCESS) {
          const data = response.data;
          const parkingSpotObject = data;
          const colorCode = "#FFFFFF";
          let iconUrl = " ";
          const label = " ";

          if (parkingSpotObject.markerIcon == WebConstants.BIN_STATUS.FULL) {
            iconUrl = "assets/images/red.png";
          } else if (
            parkingSpotObject.markerIcon == WebConstants.BIN_STATUS.EMPTY
          ) {
            iconUrl = "assets/images/green.png";
          } else if (
            parkingSpotObject.markerIcon == WebConstants.BIN_STATUS.HALF_FULL
          ) {
            iconUrl = "assets/images/orange.png";
          } else {
            iconUrl = "assets/images/red.png";
          }

          const object = {
            lat: parkingSpotObject.latitude - 0.000016,
            lng: parkingSpotObject.longitude,
            spotName: parkingSpotObject.spotName,
            sensorName: parkingSpotObject.sensorName,
            parkingSpotActivity: parkingSpotObject.parkingSpotActivity,
            occupyStatus: parkingSpotObject.occupyStatus,
            occupancy: parkingSpotObject.occupyStatus,
            occupiedDuration: parkingSpotObject.occupiedDuration,
            color: colorCode,
            iconUrl,
            label,
            statusOccupied: parkingSpotObject.statusOccupied,
            numberOfTrn: parkingSpotObject.numberOfTrn,
            devEui: parkingSpotObject.devEUI,
            height: parkingSpotObject.height,
            status: parkingSpotObject.trashCanStatus,
            deviceDatetime: parkingSpotObject.deviceDatetime,
            elaspTime: timeConvertByMinutes(parkingSpotObject.elaspTime),
            level: parkingSpotObject.levelStatus,
          };

          for (let x = 0; x < this.parkingspotMarkers.length; x++) {
            if (this.parkingspotMarkers[x].devEui == object.devEui) {
              this.parkingspotMarkers[x] = object;
            }
          }
        }
      });
  }

  binSpotMarkerTypeWrtToggle(): any {
    const tempBinSpotMarkers = [];
    // this.bale(20);

    console.log("binSpotResponseList={}", this.binSpotResponseList);

    for (let i = 0; i < this.binSpotResponseList.length; i++) {
      const binSpotObject = this.binSpotResponseList[i];
      const markerObject = this.fillMapMarkerObject(binSpotObject);
      this.markerMapObject.set(binSpotObject.spotName, markerObject);

      tempBinSpotMarkers.push(markerObject);
    }

    console.log("tempParkingSpotMarkers={}", tempBinSpotMarkers);

    return tempBinSpotMarkers;
  }

  focusMap(sessionExpired: any): void {
    this.mapLat = sessionExpired.latitude - 0.00001;
    this.mapLng = sessionExpired.longitude - 0.00001;
    this.mapZoom = 19;
    this.focusedDevEui = sessionExpired.devEui;
    setTimeout(() => {
      this.mapZoom = 20;

      // this.bale(this.mapZoom);

      this.mapLat = sessionExpired.latitude;
      this.mapLng = sessionExpired.longitude;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.currentExpiredSessionList = this.currentExpiredSessionObjects.filter(
      (object) =>
        (object.spotName !== undefined &&
          object.spotName.toLowerCase().includes(filterValue.toLowerCase())) ||
        (object.devEui !== undefined &&
          object.devEui.toLowerCase().includes(filterValue.toLowerCase()))
    );

    this.noEventSessionList = this.noEventSessionList.filter(
      (object) =>
        (object.spotName !== undefined &&
          object.spotName.toLowerCase().includes(filterValue.toLowerCase())) ||
        (object.devEui !== undefined &&
          object.devEui.toLowerCase().includes(filterValue.toLowerCase()))
    );

    this.getFilteredSession(this.selectedStatusFilter, true);
  }

  createWebSocketConnections(): void {
    this.messageHandlerCallback = this.messageHandler.bind(this);
    const topics = [
      WebConstants.WEB_SOCKET.TOPIC.BINWISE_NOTIFICATION,
      WebConstants.WEB_SOCKET.TOPIC.SESSION_EXPIRED_NOTIFICATION,
    ];

    this.webSocketConfiguration.createWebSocketConnection(
      WebConstants.WEB_SOCKET.ENDPOINT.WEB_NOTIFICATION,
      topics,
      this.messageHandlerCallback
    );
  }

  messageHandler(payload: any): void {
    const data = JSON.parse(JSON.parse(payload.body));

    // console.log("msgHandler", data);

    if (data != null) {
      this.displaySingleParkingSpot(true, data.devEUI);
      this.getCurrentSessions();
      // this.getPastSessions();
      this.getAllParkingSpot(true);
    }
  }

  currentExpiredSessionDialog(object: any): void {
    const dialog = this.matDialog.open(CurrentExpiredSessionDialogComponent, {
      width: "600px",
      data: object,
    });

    dialog.afterClosed().subscribe((result) => {
      this.getCurrentSessions();
    });
  }

  pastExpiredSessionDialog(object: any): void {
    const dialog = this.matDialog.open(PastExpiredSessionDialogComponent, {
      width: "600px",
      data: object,
    });

    dialog.afterClosed().subscribe((result) => {
      const mapSessionSearchCriteria = {
        startDate: this.pastSessionStartDate,
        endDate: this.pastSessionEndDate,
      };

      this.getPastSessionList(mapSessionSearchCriteria);
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    setTimeout(() => {
      if (this.webSocketConfiguration.stompClient) {
        this.webSocketConfiguration.disconnectWebSocketConnection();
      }
    }, 1500);
  }

  getDateWithFormat(date: any, format: any): any {
    return this.datePipe.transform(date, format);
  }

  getKeys(map: any): any {
    return Array.from(map.values());
  }

  createSvg(fillColor: string = "red"): any {
    return (
      'data:image/svg+xml;utf-8, \
    <svg width="10" height="10" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"> \
      <circle cx="4.4" cy="4.4" r="4.4" fill="' +
      fillColor.replace("#", "%23") +
      '" d="M3.5 3.5h25v25h-25z"/> \
    </svg>'
    );
  }

  getClass(status: string): any {
    if (status === "HALF_FULL") {
      //console.log("agha half full",this.currentExpiredSessionObjects[0].fullColor)

      //return this.currentExpiredSessionObjects[0].partialColor
      return "cc orange";
    } else if (status === "EMPTY") {
      return "cc green";
    }
    return "cc red";
  }

  getStatusValue(status: string): any {
    let result = "No Event";
    this.allStatusFilters.forEach((statusFilter) => {
      if (statusFilter.value === status) {
        result = statusFilter.name;
      }
    });
    return result;
  }

  convertMinutesToString(elaspTime: any, status: boolean): any {
    return status && elaspTime != null && elaspTime !== ""
      ? timeConvertByMinutes(elaspTime)
      : "--";
  }
}
