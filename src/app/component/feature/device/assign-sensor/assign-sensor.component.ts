import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DeviceService } from 'src/app/services/device.service';
import { SensorService } from 'src/app/services/sensor.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { TokenStorage } from 'src/app/util/token.storage';
import { ToastrService } from 'ngx-toastr';
import { WebConstants } from 'src/app/util/web.constants';
import { first } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Lookup } from 'src/app/model/lookup';


@Component({
  selector: 'app-assign-sensor',
  templateUrl: './assign-sensor.component.html',
  styleUrls: ['./assign-sensor.component.scss']
})
export class AssignSensorComponent implements OnInit {

  public form: any;
  public allSensors: any[] = [];
  public allSensorTypes: Lookup[] = [];
  public allVehicle: Lookup[] = [];
  public allParkingspot: Lookup[] = [];
  
  public sensor_type_name: any = "";
  public correctSensorType: boolean = false;
  public ActionBtn = "Add";
  public updateData:any = {};
  public hiddenForm:any = false; 

  public displayColumns: string[] = ["sensorname", "sensorType","devicename", "status", "actions"];
  public dataSource = new MatTableDataSource();


  @ViewChild(MatSort) sort: MatSort;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    public dialogRef: MatDialogRef<AssignSensorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public sensorService: SensorService,
    public tokenStorage: TokenStorage,
    public toastrService: ToastrService
  ) { 
    this.getAllSensorTypes();
    this.getAllSensorsByDeviceId();
    this.initializeForm();
  }

  ngOnInit(): void {
  }

  initializeForm(){
    this.form = new FormGroup({
      sensorname: new FormControl("", Validators.required),
      sensortypeid: new FormControl("", Validators.required),
    });
  }

   getAllSensorTypes() {
    this.sensorService.getAllSensorType()
   .pipe(first())
   .subscribe(response => {
       if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
         let data = response.data;
         for (var x = 0; x < data.length; x++) {
           var obj = {
             id: data[x].id,
             name: data[x].sensortypename,
           }
           this.allSensorTypes[x] = obj;
         }
       } else {
        this.toastrService.error(response.value,"Failed To Load Data!")
       }
     });
   }
  
  getAllSensorsByDeviceId() {
    let deviceId = this.data.id;
    this.sensorService.getAllSensorByDeviceId(deviceId)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          if(response.data !== null){
            this.allSensors = [response.data];
            this.dataSource = new MatTableDataSource<unknown>(this.allSensors);
            this.hiddenForm = true;
          }else{
            this.allSensors = []; 
            this.dataSource = new MatTableDataSource<unknown>(this.allSensors);
            this.hiddenForm = false;
          }
          console.log("response ",response.data);
        } else {
          this.toastrService.error(response.value,"Failed To Load Data!")
        }
      });
  }
  
  assingSensors(){
    let data = this.form.getRawValue();
    data.deviceid = this.data.id;
    if(this.ActionBtn === 'Edit'){
      data.id = this.updateData.id;
    }
    
    this.sensorService.addSensor(data)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value,"Sensor "+this.ActionBtn+" Successfully!")
          this.getAllSensorsByDeviceId();
          this.form.reset();
          this.updateData = {};
        } else {
          this.toastrService.error(response.value,"Failed To "+this.ActionBtn+" Data!")
        }
        this.ActionBtn = 'Add';
      });
    
  }

  onToggleChange(elemet, event) {
    if (event.checked == true) {
      this.statusUpdateSensor(elemet);
    }
    else {
      this.deleteSensor(elemet);
    }
  }

  statusUpdateSensor(element) {
    element.status = 1;
    this.sensorService.updateSensor(element)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value,"Sensor Updated Successfully!")
          this.getAllSensorsByDeviceId();
        } else {
          this.toastrService.error(response.value,"Failed To Update Data!")
        }
      });
  }

  deleteSensor(element) {
    this.sensorService.deleteSensor(element.id)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value,"Sensor Deleted Successfully!")
          this.getAllSensorsByDeviceId();
        } else {
          this.toastrService.error(response.value,"Failed To Delete Data!")
        }
      });
  }

  update(element){
    this.ActionBtn = "Edit";
    this.updateData = element;
    this.form.get('sensorname').setValue(this.updateData.sensorname);
    this.form.get('sensortypeid').setValue(this.updateData.sensortypeid);  
    console.log("in update Sensor ",element)
    this.hiddenForm = false;
  } 

  closeDialog(): void {
    this.dialogRef.close();
  }

}
