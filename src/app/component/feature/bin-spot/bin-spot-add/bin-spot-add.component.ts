import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ParkingSpotService } from "src/app/services/parking-spot.service";
import { first } from "rxjs/operators";
import { WebConstants } from "src/app/util/web.constants";
import { ToastrService } from "ngx-toastr";
import { GeofenceService } from "src/app/services/geofence.service";
import { TokenStorage } from "src/app/util/token.storage";
import { Lookup } from "src/app/model/lookup";
import { OrganizationService } from "src/app/services/organization.service";

import "rxjs/add/operator/debounceTime";
import { BinTypeService } from "../../../../services/bin.type.service";

@Component({
  selector: "app-bin-spot-add",
  templateUrl: "./bin-spot-add.component.html",
  styleUrls: ["./bin-spot-add.component.scss"],
})
export class BinSpotAddComponent implements OnInit {
  public form: any;
  // public allGeofences: Lookup[] = [];
  public allOrganizations: Lookup[] = [];
  public allBinTypes: Lookup[] = [];

  public superAdmin: boolean;

  constructor(
    public dialogRef: MatDialogRef<BinSpotAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public geofenceService: GeofenceService,
    public parkingSpotService: ParkingSpotService,
    public toastrService: ToastrService,
    public bintypeService: BinTypeService,
    public tokenStorage: TokenStorage,
    public organizationService: OrganizationService
  ) {
    // dialogRef.disableClose = true;
    if (this.tokenStorage.getRole() === "ROLE_SUPER_ADMIN") {
      this.superAdmin = true;
      this.getAllOrganizations();
    }
    this.initlizeForm();
    this.getAllBinTypes();
  }

  ngOnInit(): void {
    // this.getAllGeofence();
    // this.initlizeForm();
  }

  initlizeForm() {
    this.form = new FormGroup({
      // spotName: new FormControl("", Validators.required),
      organizationId: new FormControl("", Validators.required),
      sensorType: new FormControl("", Validators.required),
      binName: new FormControl("", Validators.required),
      latitude: new FormControl("", Validators.required),
      longitude: new FormControl("", Validators.required),
      //geofenceId: new FormControl("", Validators.required),
      // sensorName: new FormControl(""),
      deviceId: new FormControl("", Validators.required),

      // percentageOfFull: new FormControl("", Validators.min(75)),
      percentageOfFull: new FormControl(
        "",
        Validators.compose([Validators.min(40), Validators.max(100)])
      ), //Adjusted 75% to 40% for small bin testing after Salman Haider Request
      percentageOfEmpty: new FormControl(
        "",
        Validators.compose([Validators.max(25), Validators.min(5)])
      ), //Adjusted 40% to 25% for small bin testing after Salman Haider Request to accomodate Partial

      frequentlyUsedLimit: new FormControl("", Validators.required),
      status: new FormControl("", Validators.required),
      binTypeId: new FormControl("", Validators.required),
    });
    if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
      this.form.get("organizationId").disable();
    }
  }

  getAllOrganizations() {
    this.organizationService
      .getAllActive()
      .pipe(first())
      .subscribe((response) => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          const data = response.data;
          for (let x = 0; x < data.length; x++) {
            const obj = {
              id: data[x].id,
              name: data[x].name,
            };
            this.allOrganizations[x] = obj;
          }
        } else {
          this.toastrService.error(response.value, "Failed To Load Data!");
        }
      });
  }

  getAllBinTypes() {
    this.bintypeService
      .getAllByOrganization(this.tokenStorage.getOrganizationId())
      .pipe(first())
      .subscribe((response) => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          for (let x = 0; x < response.data.length; x++) {
            const obj = {
              id: response.data[x].id,
              name: response.data[x].binType,
            };
            this.allBinTypes[x] = obj;
          }
        } else {
          this.toastrService.error(response.value, "Failed To Load BinTypes!");
        }
      });
  }

  // getAllGeofence() {
  //   this.geofenceService.getAll()
  // .pipe(first())
  // .subscribe(response => {
  //     if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
  //       let data = response.data;
  //       for (var x = 0; x < data.length; x++) {
  //         var obj = {
  //           id: data[x].id,
  //           name: data[x].geofenceName,
  //         }
  //         this.allGeofences[x] = obj;
  //       }
  //     } else {
  //       this.toastrService.error(response.value,"Failed To Load Data!")
  //     }
  //   });
  // }

  addParkingSpot($event: MouseEvent) {
    ($event.target as HTMLButtonElement).disabled = true;
    console.log("add ParkingSpot data ", this.form.getRawValue());
    let data = this.form.getRawValue();

    if (!this.superAdmin) {
      data.organizationId = this.tokenStorage.getOrganizationId();
    }

    this.parkingSpotService
      .addParkingSpot(data)
      .pipe(first())
      .subscribe(
        (response) => {
          if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
            this.toastrService.success(
              response.value,
              "Data Add Successfully!"
            );
            this.dialogRef.close();
          } else {
            this.toastrService.error(response.value, "Failed To Add Data!");
          }
        },
        (error) => {
          ($event.target as HTMLButtonElement).disabled = false;
        }
      );
  }

  checkRole() {
    if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
      return true;
    } else {
      return false;
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
