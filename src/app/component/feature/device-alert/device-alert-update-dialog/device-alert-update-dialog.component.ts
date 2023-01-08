import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TokenStorage } from 'src/app/util/token.storage';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DeviceService } from 'src/app/services/device.service';
import { first } from 'rxjs/operators';
import { WebConstants } from 'src/app/util/web.constants';
import { DeviceAlertService } from 'src/app/services/device-alert.service';
import { Lookup } from 'src/app/model/lookup';

@Component({
  selector: 'app-device-alert-update-dialog',
  templateUrl: './device-alert-update-dialog.component.html',
  styleUrls: ['./device-alert-update-dialog.component.scss']
})
export class DeviceAlertUpdateDialogComponent implements OnInit {

  public form: any;
  public allDevices: Lookup[] = [];

  constructor(
    public dialogRef: MatDialogRef<DeviceAlertUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public tokenStorage: TokenStorage,
    public deviceService: DeviceService,
    public toastrService: ToastrService,
    public deviceAlertService: DeviceAlertService
  ) {
    if(this.tokenStorage.getRole() !== "ROLE_SUPER_ADMIN"){    
      this.getAllDevicesByOrganizationId();
    }else{
      this.getAllDevices();
    }
    this.initlizeDeviceAlertUpdateForm();
  }

  ngOnInit() { }  

  initlizeDeviceAlertUpdateForm() {
    this.form = new FormGroup({
      deviceid: new FormControl("", Validators.required),
      callAlertActive: new FormControl(""),
      callAlertStartTime: new FormControl(""),
      callAlertEndTime: new FormControl(""),
      callAlertType: new FormControl(""),
      callThreshold: new FormControl(""),

      smsAlertActive: new FormControl(""),
      smsAlertStartTime: new FormControl(""),
      smsAlertEndTime: new FormControl(""),
      smsAlertType: new FormControl(""),
      smsThreshold: new FormControl(""),
    });

    
    this.form.get('callAlertActive').setValue(this.data.callAlertActive ===1?true:false);
    if(this.form.get('callAlertActive').value){
      this.form.get('callAlertStartTime').setValue(this.data.callAlertStartTime);
      this.form.get('callAlertEndTime').setValue(this.data.callAlertEndTime);
      this.form.get('callAlertType').setValue(this.data.callAlertType);
      this.form.get('callThreshold').setValue(this.data.callThreshold);
    }

    this.form.get('smsAlertActive').setValue(this.data.smsAlertActive === 1?true:false);
    if(this.form.get('smsAlertActive').value){
      this.form.get('smsAlertStartTime').setValue(this.data.smsAlertStartTime);
      this.form.get('smsAlertEndTime').setValue(this.data.smsAlertEndTime);
      this.form.get('smsAlertType').setValue(this.data.smsAlertType);
      this.form.get('smsThreshold').setValue(this.data.smsThreshold);
    }
  }

  getAllDevices() {
    this.deviceService.getAll()
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          let data = response.data;
          for (var x = 0; x < data.length; x++) {
            var obj = {
              id: data[x].id,
              name: data[x].name,
            }
            this.allDevices[x] = obj;
          }
          for (var x = 0; x < this.allDevices.length; x++) {
            if (this.data.device.id == this.allDevices[x].id) {
              this.form.controls['deviceid'].setValue(this.allDevices[x].id);
            }
          }
          console.log("response ",response.data);
        } else {
          this.toastrService.error(response.value,"Failed To Load Data!")
        }
      });
  }

  getAllDevicesByOrganizationId(){
    this.deviceService.findDeviceByOrganizationId(this.tokenStorage.getOrganizationId())
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          let data = response.data;
          
          for (var x = 0; x < data.length; x++) {
            var obj = {
              id: data[x].id,
              name: data[x].name,
            }
            this.allDevices[x] = obj;
          }
          console.log("response ",response.data);
        } else {
          this.toastrService.error(response.value,"Failed To Load Data!")
        }
      });
  }

  updateDeviceAlertData() {
    console.log("update Device Alert data ",this.form.getRawValue() );
    let updatedData = this.form.getRawValue()
    updatedData.id = this.data.id;
    updatedData.callAlertActive = updatedData.callAlertActive === true?1:0;
    updatedData.smsAlertActive = updatedData.smsAlertActive === true?1:0;

    this.deviceAlertService.updateDeviceAlert(updatedData)
      .pipe(first())
      .subscribe(response => {
        if(response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value,"Data Update Successfully!");
          this.closeDialog();
        } else {
          this.toastrService.error(response.value,"Failed To Update Data!")
        }
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  callAlertChecked(){
    return !this.form.get('callAlertActive').value;
  }

  smsAlertChecked(){
    return !this.form.get('smsAlertActive').value;
  }

  resetCallData(){
    if(this.form.get('callAlertActive').value === false){
      this.form.get('callAlertStartTime').reset();
      this.form.get('callAlertEndTime').reset();
      this.form.get('callAlertType').reset();
      this.form.get('callThreshold').reset();
    }
  }
  resetSmsData(){
    if(this.form.get('smsAlertActive').value === false){
      this.form.get('smsAlertStartTime').reset();
      this.form.get('smsAlertEndTime').reset();
      this.form.get('smsAlertType').reset();
      this.form.get('smsThreshold').reset();
    }
  }
}

