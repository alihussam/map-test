import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TokenStorage } from 'src/app/util/token.storage';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { WebConstants } from 'src/app/util/web.constants';
import { DeviceService } from 'src/app/services/device.service';
import { DeviceAlertService } from 'src/app/services/device-alert.service';
import { Lookup } from 'src/app/model/lookup';


@Component({
  selector: 'app-device-alert-add-dialog',
  templateUrl: './device-alert-add-dialog.component.html',
  styleUrls: ['./device-alert-add-dialog.component.scss']
})

export class DeviceAlertAddDialogComponent implements OnInit {

  public form: any;
  public allDevices: Lookup[] = [];

  constructor(
    public dialogRef: MatDialogRef<DeviceAlertAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public deviceService: DeviceService,
    public deviceAlertService: DeviceAlertService,
    public tokenStorage: TokenStorage,
    public toastrService: ToastrService,
  ) {
    if(this.tokenStorage.getRole() !== "ROLE_SUPER_ADMIN"){    
      this.getAllDevicesByOrganizationId();
    }else{
      this.getAllDevices();
    }
    this.initlizeDeviceAlertAddForm();
  }

  ngOnInit() { }  

  initlizeDeviceAlertAddForm() {
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

    this.form.get('callAlertActive').setValue(false);
    this.form.get('smsAlertActive').setValue(false);
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

  addDeviceAlertData() {
    console.log("add Device Alert data ",this.form.getRawValue() );
    let data = this.form.getRawValue()
    data.callAlertActive = data.callAlertActive === true?1:0;
    data.smsAlertActive = data.smsAlertActive === true?1:0;
    
    this.deviceAlertService.addDeviceAlert(data)
      .pipe(first())
      .subscribe(response => {
        if(response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value,"Data Add Successfully!");
          this.closeDialog();
        } else {
          this.toastrService.error(response.value,"Failed To Add Data!")
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
