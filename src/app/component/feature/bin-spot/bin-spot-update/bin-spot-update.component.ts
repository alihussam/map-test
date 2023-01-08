import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ParkingSpotService } from 'src/app/services/parking-spot.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { WebConstants } from 'src/app/util/web.constants';
import { GeofenceService } from 'src/app/services/geofence.service';
import { TokenStorage } from 'src/app/util/token.storage';
import { Lookup } from 'src/app/model/lookup';
import { OrganizationService } from 'src/app/services/organization.service';
import { getStatusCode, getStatusList, getStatusMessage, WebUtil } from 'src/app/util/web.util';
import {BinTypeService} from '../../../../services/bin.type.service';


@Component({
  selector: 'app-bin-spot-update',
  templateUrl: './bin-spot-update.component.html',
  styleUrls: ['./bin-spot-update.component.scss']
})
export class BinSpotUpdateComponent implements OnInit {

  public form: any;
  public allGeofences: Lookup[] = [];
  public allOrganizations: Lookup[] = [];
  public superAdmin: boolean
  public statusList: any = [];
  public allBinTypes: Lookup[] = [];

  constructor(
    public dialogRef: MatDialogRef<BinSpotUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public geofenceService: GeofenceService,
    public parkingSpotService: ParkingSpotService,
    public bintypeService: BinTypeService,
    public toastrService: ToastrService,
    public tokenStorage: TokenStorage,
    public organizationService: OrganizationService,
    public webUtil: WebUtil
  ) {


    if(this.tokenStorage.getRole() === "ROLE_SUPER_ADMIN"){
      this.superAdmin = true;
      this.getAllOrganizations();
     }
    this.initlizeForm();
    this.getAllBinTypes();
  }

  ngOnInit(): void {

    //this.getAllGeofence();
    //this.initlizeForm();
  }

  initlizeForm() {


    this.statusList = getStatusList();

    this.form = new FormGroup({
      organizationId: new FormControl('', Validators.required),
      sensorType: new FormControl("", Validators.required),
      binName: new FormControl("", Validators.required),
      latitude: new FormControl("", Validators.required),
      longitude: new FormControl("", Validators.required),
      //geofenceId: new FormControl("", Validators.required),
     // sensorName: new FormControl(""),
      deviceId: new FormControl(""),
      //devEui:new FormControl(""),
      percentageOfFull: new FormControl("", Validators.compose([Validators.min(40), Validators.max(100)])), //Adjusted 75% to 40% for small bin testing after Salman Haider Request
      percentageOfEmpty: new FormControl("", Validators.max(25)),  //Adjusted 40% to 25% for small bin testing after Salman Haider Request to accomodate Partial
      frequentlyUsedLimit: new FormControl("", Validators.required),
      status: new FormControl("", Validators.required),
      binTypeId: new FormControl("", Validators.required),
    });

    if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
      this.form.get("organizationId").disable();
    }

    this.form.get("organizationId").setValue(this.data.organizationId);
    this.form.get('sensorType').setValue(this.data.sensorType);
    this.form.get('binName').setValue(this.data.binName);
    this.form.get('latitude').setValue(this.data.latitude);
    this.form.get('longitude').setValue(this.data.longitude);
   // this.form.get('sensorName').setValue(this.data.sensorName);
    this.form.get('deviceId').setValue(this.data.deviceId);
   // this.form.get('devEui').setValue(this.data.devEui);

    this.form.get('percentageOfFull').setValue(this.data.percentageOfFull);
    this.form.get('percentageOfEmpty').setValue(this.data.percentageOfEmpty);
    this.form.get('frequentlyUsedLimit').setValue(this.data.frequentlyUsedLimit);
    this.form.get('status').setValue(getStatusMessage(this.data.status));
    this.form.get('binTypeId').setValue(this.data.binTypeId);
  }

  // getAllGeofence() {
  //   this.geofenceService.getAll()
  //     .pipe(first())
  //     .subscribe(response => {
  //       if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
  //         let data = response.data;

  //         for (var x = 0; x < data.length; x++) {
  //           var obj = {
  //             id: data[x].id,
  //             name: data[x].geofenceName,
  //           }
  //           this.allGeofences[x] = obj;
  //         }

  //         for (var x = 0; x < this.allGeofences.length; x++) {
  //           if (this.data.geofence.id == this.allGeofences[x].id) {
  //             this.form.controls['geofenceId'].setValue(this.allGeofences[x].id);
  //           }
  //         }
  //       } else {
  //         alert(response.value);
  //       }
  //     });
  // }

  updateParkingSpot() {
    //console.log("update Organization Data ", this.form.getRawValue());
    let updatedData = this.form.getRawValue();
    updatedData.id = this.data.id;

    this.parkingSpotService.updateParkingSpot(updatedData)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value, "Data Updated Successfully!");
          this.dialogRef.close();
        } else {
          this.toastrService.error(response.value, "Failed To Update Data!");
        }
      });
  }

  // getAllOrganizations() {
  //   this.organizationService
  //     .getAllActive()
  //     .pipe(first())
  //     .subscribe((response) => {
  //       if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
  //         let data = response.data;
  //         for (var x = 0; x < data.length; x++) {
  //           var obj = {
  //             id: data[x].id,
  //             name: data[x].name,
  //           };
  //           this.allOrganizations[x] = obj;
  //         }
  //       } else {
  //         this.toastrService.error(response.value, "Failed To Load Data!");
  //       }
  //     });
  // }

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
          this.toastrService.error(response.value, 'Failed To Load BinTypes!');
        }
      });
  }
  
  getAllOrganizations() {
    this.organizationService.getAllActive()
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          console.log(response.data);
          let data = response.data;
          console.log("agha",this.data)
          for (var x = 0; x < data.length; x++) {
            var obj = {
              id: data[x].id,
              name: data[x].name,
            }
            this.allOrganizations[x] = obj;
          }
          for (var x = 0; x < this.allOrganizations.length; x++) {
            if (this.data.organizationId == this.allOrganizations[x].id)
             {
              this.form.controls['organizationId'].setValue(this.allOrganizations[x].id);
            }
          }
        } else {
          this.toastrService.error(response.value,"Failed To Load Data!")
        }
      });
  }

  checkRole(){
    if(this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN"){
       return true;
    }
    else{
      return false;
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
