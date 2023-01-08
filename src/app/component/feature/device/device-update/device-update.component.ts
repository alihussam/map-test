import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TokenStorage } from 'src/app/util/token.storage';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BinSpotUpdateComponent } from '../../bin-spot/bin-spot-update/bin-spot-update.component';
import { WebConstants } from 'src/app/util/web.constants';
import { first } from 'rxjs/operators';
import { OrganizationService } from 'src/app/services/organization.service';
import { DealerService } from 'src/app/services/dealer.service';
import { DeviceService } from 'src/app/services/device.service';
import { ParkingSpotService } from 'src/app/services/parking-spot.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Lookup } from 'src/app/model/lookup';

@Component({
  selector: 'app-parking-sensor-update',
  templateUrl: './device-update.component.html',
  styleUrls: ['./device-update.component.scss']
})
export class DeviceUpdateComponent implements OnInit {
  public form: any;
  public allOrganizations: Lookup[] = [];
  public allDealers: Lookup[] = [];
  public allDeviceTypes: Lookup[] = []; 
  public allVehicle: Lookup[] = [];
  public allParkingspot: Lookup[] = [];
  public allDevices: any = [];


  public device_type_name: any = "";
  public correctDeviceType: boolean = false;
  public dealerSelected:boolean = false;

  constructor(
    public dialogRef: MatDialogRef<BinSpotUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public organizationService: OrganizationService,
    public dealerService: DealerService,
    public deviceService: DeviceService,
    public vehicleService: VehicleService,
    public parkingspotService: ParkingSpotService,
    public tokenStorage: TokenStorage,
    public toastrService: ToastrService
  ) {
    this.initializeDeviceUpdateForm();
    this.getAllDeviceTypes();
    if(this.tokenStorage.getRole() !== "ROLE_SUPER_ADMIN"){    
      //this.getAllDealersByOrganizationId(this.tokenStorage.getOrganizationId());
      this.setSelectedOrganization(this.tokenStorage.getOrganizationId());
    }else{
      this.getAllOrganizations();
    }
    this.allDevices = this.data.devices;

  }

  ngOnInit() { }  

  initializeDeviceUpdateForm() {
    this.form = new FormGroup({
      name: new FormControl("", Validators.required),
      organizationid: new FormControl("", Validators.required),
      dealerid: new FormControl("", Validators.required),
      devicetypeid: new FormControl("", Validators.required),
      vehicleid: new FormControl(""),
      parkingspotid: new FormControl(""),
      devEUI: new FormControl("", Validators.required),
    });

    this.form.get('name').setValue(this.data.name);
    this.form.get('devEUI').setValue(this.data.devEUI);

    if(this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN"){
      this.form.get("organizationid").disable();
    }
  }

  getAllOrganizations() {
    this.organizationService.getAll()
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          console.log(response.data);
          let data = response.data;
          
          for (var x = 0; x < data.length; x++) {
            var obj = {
              id: data[x].id,
              name: data[x].name,
            }
            this.allOrganizations[x] = obj;
          }
          for (var x = 0; x < this.allOrganizations.length; x++) {
            if (this.data.organization.id === this.allOrganizations[x].id) {
              this.form.controls['organizationid'].setValue(this.allOrganizations[x].id);
              this.setSelectedOrganization(this.allOrganizations[x].id);
            }
          }
        } else {
          this.toastrService.error(response.value,"Failed To Load Data!")
        }
      });
  }


  // getAllDealers() {
  //   this.dealerService.getAll()
  //     .pipe(first())
  //     .subscribe(response => {
  //       if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
  //         console.log(response.data);
  //         let data = response.data;
          
  //         for (var x = 0; x < data.length; x++) {
  //           var obj = {
  //             id: data[x].id,
  //             name: data[x].dealershipname,
  //           }
  //           this.allDealers[x] = obj;
  //         }
  //         for (var x = 0; x < this.allDealers.length; x++) {
  //           if (this.data.dealer.id === this.allDealers[x].id) {
  //             this.form.controls['dealerid'].setValue(this.allDealers[x].id);
  //           }
  //         }
  //       } else {
  //         this.toastrService.error(response.value,"Failed To Load Data!")
  //       }
  //     });
  // }

  getAllDealersByOrganizationId(organizationId){
    this.dealerService.findDealerByOrganizationId(organizationId)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.allDealers = []
          let data = response.data;
          
          for (var x = 0; x < data.length; x++) {
            var obj = {
              id: data[x].id,
              name: data[x].dealershipname,
            }
            this.allDealers[x] = obj;
          }
          console.log("data.dealer ",this.data.dealer);
          if(this.data.dealer.status === 1){
            for (var x = 0; x < this.allDealers.length; x++) {
              if (this.data.dealer.id === this.allDealers[x].id) {
                this.form.controls['dealerid'].setValue(this.allDealers[x].id);
                this.data.dealer.status = 0;
                this.setSelectedDealerId(this.allDealers[x].id)
              }
            }
          }
          console.log("response ",response.data);
        } else {
          this.toastrService.error(response.value,"Failed To Load Data!")
        }
      });
  }

  getAllDeviceTypes() {
    this.deviceService.getAllDeviceType()
   .pipe(first())
   .subscribe(response => {
       if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
         let data = response.data;
         for (var x = 0; x < data.length; x++) {
           var obj = {
             id: data[x].id,
             name: data[x].devicetype,
           }
           this.allDeviceTypes[x] = obj;
         }
         for (var x = 0; x < this.allDeviceTypes.length; x++) {
          if (this.data.deviceType.id === this.allDeviceTypes[x].id) {
            this.form.controls['devicetypeid'].setValue(this.allDeviceTypes[x].id);
            this.setSelectedDeviceTypeName(this.allDeviceTypes[x].id);
          }
        }
       } else {
        this.toastrService.error(response.value,"Failed To Load Data!")
       }
     });
   }

   getAllVehicleByDealerId(dealerId: number) {
    if(!dealerId){
      return;
    }
    this.vehicleService.getAllVehicleByDealerId(dealerId)
   .pipe(first())
   .subscribe(response => {
       if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
         this.allVehicle = [];
         let data = response.data;
         for (var x = 0; x < data.length; x++) {
           var obj = {
             id: data[x].id,
             name: data[x].vehiclename,
           }
           this.allVehicle[x] = obj;
         }
         if(this.data.vehicle.status === 1){
          for (var x = 0; x < this.allVehicle.length; x++) {
            if (this.data.vehicle.id === this.allVehicle[x].id) {
              this.form.controls['vehicleid'].setValue(this.allVehicle[x].id);
              this.data.vehicle.status = 0;
            }
          }
         }
       } else {
        this.toastrService.error(response.value,"Failed To Load Data!")
       }
     });
   }

   getAllParkingSpotByDealerId(dealerId: number) {
    if(!dealerId){
      return;
    }
    this.parkingspotService.getAllParkingSpotByDealerId(dealerId)
   .pipe(first())
   .subscribe(response => {
       if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
        this.allParkingspot = []; 
        let data = response.data;
         for (var x = 0; x < data.length; x++) {
           var obj = {
             id: data[x].id,
             name: data[x].spotname,
           }
           this.allParkingspot[x] = obj;
         }
         if(this.data.parkingSpot.status === 1){
          for (var x = 0; x < this.allParkingspot.length; x++) {
            if (this.data.parkingSpot.id === this.allParkingspot[x].id) {
              this.form.controls['parkingspotid'].setValue(this.allParkingspot[x].id);
              this.data.parkingSpot.status = 0;
            }
          }
         }
       } else {
        this.toastrService.error(response.value,"Failed To Load Data!")
       }
     });
   }

  updateDeviceData() {
    // if(this.form.getRawValue().vehicleid === null && this.form.getRawValue().parkingspotid === null){
    //   this.toastrService.warning("please select right sensor type","Vehcile or Parking spot not selected");
    //   return;
    // }

    // for(let i=0;i<this.allDevices.length;i++ ){
    //   if(this.allDevices[i]?.vehicle.id === this.form.getRawValue().vehicleid && this.allDevices[i].id !== this.data.id){
    //     this.toastrService.warning("A Device can be assigned to One Vehicle","Change Vehicle");
    //     return;
    //   }
    // }
    console.log("update Device Data ",this.form.getRawValue());
    let updatedData = this.form.getRawValue();
    updatedData.id = this.data.id;
    if(this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN"){    
      updatedData.organizationid = this.tokenStorage.getOrganizationId();
    }
    this.deviceService.updateDevice(updatedData)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value,"Data Updated Successfully!");
          this.dialogRef.close();
        } else {
          this.toastrService.error(response.value,"Failed To Update Data!");
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
  
  setSelectedDeviceTypeName(deviceTypeId){
    let deviceName = "";
    for(let i = 0 ;i< this.allDeviceTypes.length; i++){
      if(deviceTypeId == this.allDeviceTypes[i].id){
        deviceName = this.allDeviceTypes[i].name;
      }
    }
    this.device_type_name = deviceName;
    if(this.device_type_name === 'Tracker'){
      this.correctDeviceType = true; 
      this.form.get("parkingspotid").reset()
    }else
    if(this.device_type_name === 'Parking Sensor'){
      this.correctDeviceType = true; 
      this.form.get("vehicleid").reset()
    }else{
      this.correctDeviceType = false;
      this.form.get("vehicleid").reset()
      this.form.get("parkingspotid").reset()
    }
  }

  setSelectedDealerId(dealersId){
    this.dealerSelected = true;
    this.getAllParkingSpotByDealerId(dealersId);
    this.getAllVehicleByDealerId(dealersId);
    this.form.get("vehicleid").reset()
    this.form.get("parkingspotid").reset() 
  }

  setSelectedOrganization(organizationId){
    this.form.get("dealerid").reset();
    this.form.get("vehicleid").reset()
    this.form.get("parkingspotid").reset()
    this.getAllDealersByOrganizationId(organizationId);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
