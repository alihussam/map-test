import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog, MatTableDataSource } from '@angular/material';
import { DeviceUpdateComponent } from './device-update/device-update.component';
import { DeviceAddComponent } from './device-add/device-add.component';
import { ToastrService } from 'ngx-toastr';
import { TokenStorage } from 'src/app/util/token.storage';
import { FormBuilder } from '@angular/forms';
import { AssignSensorComponent } from './assign-sensor/assign-sensor.component';
import { DeviceService } from 'src/app/services/device.service';
import { first } from 'rxjs/operators';
import { WebConstants } from 'src/app/util/web.constants';
import { DeviceFileUploaderComponent } from './device-file-uploader/device-file-uploader.component';


export interface Vehicle {
  id: number;
  sensorName: string;
  deviceId: number;
  sensorTypeId: number;
  status: number;
}

@Component({
  selector: 'app-parking-sensor',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

  public displayedColumns: string[] = [
    'name',
    'orgname',
    'dealername',
    'devicetypename',
    'vehiclename',
    'parkingspotname',
    'devEUI',
    'actions'
  ];

  public dataSource = new MatTableDataSource();
  public allDevices: any[] = [];
  devices:any = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public formBuilder: FormBuilder,
    public dialog: MatDialog,
    public deviceService: DeviceService,
    public tokenStorage: TokenStorage,
    public toastrService: ToastrService) {
      if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
        this.getAllDevicesByOrganizationId();
      } else {
        this.getAllDevices();
      }
    }

  ngOnInit(): void {
  }

  getAllDevices() {
    this.deviceService.getAll()
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.devices = response.data;
          this.dataSource = new MatTableDataSource<unknown>(this.devices);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
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
          this.devices = response.data;
          this.dataSource = new MatTableDataSource<unknown>(this.devices);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log("response ",response.data);
        } else {
          this.toastrService.error(response.value,"Failed To Load Data!")
        }
      });
  }

  assignSensor(data){
    const dialogRef = this.dialog.open(AssignSensorComponent, {
      width: "1000px",
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
        this.getAllDevicesByOrganizationId();
      } else {
        this.getAllDevices();
      }
    });
  }

  addDeviceDialog() {
    const dialogRef = this.dialog.open(DeviceAddComponent, {
      width: "550px",
      data: {devices: this.devices},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
        this.getAllDevicesByOrganizationId();
      } else {
        this.getAllDevices();
      }
    });
  }

  updateDeviceDialog(data) {
    data.devices = this.devices;
    console.log(data);
    const dialogRef = this.dialog.open(DeviceUpdateComponent, {
      width: "550px",
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
        this.getAllDevicesByOrganizationId();
      } else {
        this.getAllDevices();
      }
    });
  }

  fileUploaderDialog(){
    const dialogRef = this.dialog.open(DeviceFileUploaderComponent, {
      width: '550px',
      data: null,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
        this.getAllDevicesByOrganizationId();
      } else {
        this.getAllDevices();
      }
    });
  }

  deleteDevice(device) {
    this.deviceService.deleteDevice(device.id)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value,"Device of (id: "+device.id+") Deleted Successfully!");
          if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
            this.getAllDevicesByOrganizationId();
          } else {
            this.getAllDevices();
          }
        } else {
          this.toastrService.error(response.value,"Failed To Delete Data!")
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

