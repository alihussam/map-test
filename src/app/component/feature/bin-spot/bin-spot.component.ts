import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatTableDataSource,
  MatDialog,
  MatPaginator,
  MatSort,
} from "@angular/material";
import { BinSpotAddComponent } from "./bin-spot-add/bin-spot-add.component";
import { BinSpotUpdateComponent } from "./bin-spot-update/bin-spot-update.component";
import { BinSpotFileUploaderComponent } from "./bin-spot-file-uploader/bin-spot-file-uploader.component";
import { ParkingSpotService } from "src/app/services/parking-spot.service";
import { first } from "rxjs/operators";
import { WebConstants } from "src/app/util/web.constants";
import { ToastrService } from "ngx-toastr";
import { TokenStorage } from "src/app/util/token.storage";
import { Router } from "@angular/router";
import { AngularCsv } from "angular7-csv/dist/Angular-csv";

@Component({
  selector: "app-bin-spot",
  templateUrl: "./bin-spot.component.html",
  styleUrls: ["./bin-spot.component.scss"],
})
export class BinSpotComponent implements OnInit {
  public displayedColumns: string[] = [
    "organizationName",
    "binName",
    "latitude",
    "longitude",
    "deviceId",
    // 'devEui',
    "percentageOfFull",
    "percentageOfEmpty",
    "frequentlyUsedLimit",
    "sensorType",
    "binTypeName",
    "status",
    "actions",
  ];
  public dataSource = new MatTableDataSource();
  sampleData: any;
  public parkingSpots: any = [];
  public tempId: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    public parkingSpotService: ParkingSpotService,
    private router: Router,
    public toastrService: ToastrService,
    public tokenStorage: TokenStorage
  ) {
    // this.getAllParkingSpot();

    if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
      this.findParkingSpotByOrganizationId(
        this.tokenStorage.getOrganizationId()
      );
    } else {
      this.getAllParkingSpot();
    }
    //findParkingSpotByOrganizationId
  }

  ngOnInit(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllParkingSpot() {
    this.parkingSpotService
      .getAll()
      .pipe(first())
      .subscribe((response) => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.parkingSpots = response.data;

          this.parkingSpots = this.parkingSpots.map((spot) => {
            if (spot.status != null) {
              if (spot.status == 1) {
                spot.status = "Active";
              } else if (spot.status == 2) {
                spot.status = "Inactive";
              }
            } else {
              spot.status = "Inactive";
            }

            return spot;
          });

          this.dataSource = new MatTableDataSource<unknown>(this.parkingSpots);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log("response ", response.data);
        } else {
          this.toastrService.error(response.value, "Failed To Load Data!");
        }
      });
  }

  getTempId(obj: any) {
    this.tempId = obj;
  }

  ////

  findParkingSpotByOrganizationId(organizationId: any): void {
    this.parkingSpotService
      .findParkingSpotByOrganizationId(this.tokenStorage.getOrganizationId())
      .pipe(first())
      .subscribe((response) => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.parkingSpots = response.data;

          for (let i = 0; i < this.parkingSpots.length; i++) {
            console.log(
              "this.parkingSpots[i].status",
              this.parkingSpots[i].status
            );
            // if(this.organizations.status != null){

            // if(this.parkingSpots[i].status == 1){
            //   this.parkingSpots[i].active = "Active";

            // }else if(this.parkingSpots[i].status == 2){
            //   this.parkingSpots[i].active ="Inactive"
            // }

            // }
            // else{
            //   this.organizations[i].active ="Inactive"
            // }
          }

          this.dataSource = new MatTableDataSource<unknown>(this.parkingSpots);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log("response ", response.data);
        } else {
          this.toastrService.error(response.value, "Failed To Load Data!");
        }
      });
  }

  /////

  addParkingSpotDialog() {
    const dialogRef = this.dialog.open(BinSpotAddComponent, {
      width: "550px",
      data: null,
      //  disableClose: true,
    });

    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
        this.findParkingSpotByOrganizationId(
          this.tokenStorage.getOrganizationId()
        );
      } else {
        this.getAllParkingSpot();
      }
      //this.getAllParkingSpot();
    });
  }

  updateParkingSpotDialog(data) {
    console.log(data);
    const dialogRef = this.dialog.open(BinSpotUpdateComponent, {
      width: "550px",
      data: data,
    });

    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
        this.findParkingSpotByOrganizationId(
          this.tokenStorage.getOrganizationId()
        );
      } else {
        this.getAllParkingSpot();
      }
      // this.getAllParkingSpot();
    });
  }

  fileUploaderDialog() {
    const dialogRef = this.dialog.open(BinSpotFileUploaderComponent, {
      width: "550px",
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
        this.findParkingSpotByOrganizationId(
          this.tokenStorage.getOrganizationId()
        );
      } else {
        this.getAllParkingSpot();
      }
      //  this.getAllParkingSpot();
    });
  }

  deleteParkingSpot(parkingSpot) {
    this.parkingSpotService
      .deleteParkingSpot(parkingSpot.id)
      .pipe(first())
      .subscribe((response) => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(
            response.value,
            "Bin Spot Delete Successfully!"
          );

          if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
            this.findParkingSpotByOrganizationId(
              this.tokenStorage.getOrganizationId()
            );
          } else {
            this.getAllParkingSpot();
          }
          // this.getAllParkingSpot();
        } else {
          this.toastrService.error(response.value, "Failed To Delete Data!");
        }
      });
  }

  checkRole() {
    if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
      return true;
    } else {
      return false;
    }
  }

  // mapView(element: any){
  //   console.log("element ",element);

  //   this.router.navigate([WebConstants.WEB_URL.MAP_VIEW], {
  //         queryParams: {
  //           binSpotId: element.id
  //         },
  //         skipLocationChange : false,
  //       });
  // }

  options = {
    fieldSeparator: ",",
    quoteStrings: "",
    decimalseparator: ".",
    showLabels: true,
    showTitle: false,
    useBom: true,
    headers: [
      "spotName",
      "latitude",
      "longitude",
      "deviceId",
      "PercentageOfFull",
      "PercentageOfEmpty",
      "FrequentlyUsedLimit",
      "status",
      "binTypeId",
    ],
  };

  sampleCSV() {
    this.sampleData = [
      {
        spotName: "ultraSonic",
        latitude: "5245125",
        longitude: "426357",
        deviceId: "acs51246245",
        PercentageOfFull: "80",
        PercentageOfEmpty: "35",
        FrequentlyUsedLimit: "5",
        status: "1",
        binTypeId: "1",
      },
      {
        spotName: "ultraSonic",
        latitude: "5245125",
        longitude: "426357",
        deviceId: "acs51246245",
        PercentageOfFull: "80",
        PercentageOfEmpty: "35",
        FrequentlyUsedLimit: "5",
        status: "1",
        binTypeId: "1",
      },
      {
        spotName: "ultraSonic",
        latitude: "5245125",
        longitude: "426357",
        deviceId: "acs51246245",
        PercentageOfFull: "80",
        PercentageOfEmpty: "35",
        FrequentlyUsedLimit: "5",
        status: "1",
        binTypeId: "1",
      },
    ];

    new AngularCsv(this.sampleData, "SampleCSV", this.options);
  }
}
