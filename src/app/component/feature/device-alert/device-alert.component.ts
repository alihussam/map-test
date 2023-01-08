import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { TokenStorage } from 'src/app/util/token.storage';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { WebConstants } from 'src/app/util/web.constants';
import { DeviceAlertAddDialogComponent } from './device-alert-add-dialog/device-alert-add-dialog.component';
import { DeviceAlertUpdateDialogComponent } from './device-alert-update-dialog/device-alert-update-dialog.component';
import { DeviceAlertService } from 'src/app/services/device-alert.service';

export interface DeviceAlert {
  id: number;
  device: any;
  callAlertAcitve: any;
  callAlertEndTime: number;
  callAlertStartTime: number;
  callAlertType: any;
  callThreshold: number;
  smsAlertActive: any;
  smsAlertEndTime: number;
  smsAlertStartTime: number;
  smsAlertType: any;
  smsThreshold: number;
  status: number;
}

@Component({
  selector: 'app-device-alert',
  templateUrl: './device-alert.component.html',
  styleUrls: ['./device-alert.component.scss']
})
export class DeviceAlertComponent implements OnInit {

  public displayedColumns: string[] = [
    'devicename',
    'callAlertActive',
    'callAlertStartTime',
    'callAlertEndTime',
    'callAlertType',
    'callThreshold',
    'smsAlertActive',
    'smsAlertStartTime',
    'smsAlertEndTime',
    'smsAlertType',
    'smsThreshold',
    'actions'
  ];

  public dataSource = new MatTableDataSource();
  public allDeviceAlert: any[] = [];
  deviceAlert:any = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public formBuilder: FormBuilder,
    public dialog: MatDialog,
    public tokenStorage: TokenStorage,
    public toastrService: ToastrService,
    public deviceAlertService: DeviceAlertService) {
      if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
        this.getAllDeviceAlertByOrganizationId();
      } else {
        this.getAllDeviceAlert();
      }
    }

  ngOnInit(): void {
  }

  getAllDeviceAlert() {
    this.deviceAlertService.getAll()
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.allDeviceAlert = response.data;
          this.dataSource = new MatTableDataSource<unknown>(this.allDeviceAlert);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log("response ",response.data);
        } else {
          this.toastrService.error(response.value,"Failed To Load Data!")
        }
      });
  }

  getAllDeviceAlertByOrganizationId(){
    this.deviceAlertService.getAllDeviceAlertByOrganizationId(this.tokenStorage.getOrganizationId())
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.allDeviceAlert = response.data;
          this.dataSource = new MatTableDataSource<unknown>(this.allDeviceAlert);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log("response ",response.data);
        } else {
          this.toastrService.error(response.value,"Failed To Load Data!")
        }
      });
  }

  addDeviceAlertDialog() {
    const dialogRef = this.dialog.open(DeviceAlertAddDialogComponent, {
      width: "550px",
      data: null,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
        this.getAllDeviceAlertByOrganizationId();
      } else {
        this.getAllDeviceAlert();
      }
    });
  }

  updateDeviceAlertDialog(data) {
    console.log(data);
    const dialogRef = this.dialog.open(DeviceAlertUpdateDialogComponent, {
      width: "550px",
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
        this.getAllDeviceAlertByOrganizationId();
      } else {
        this.getAllDeviceAlert();
      }
    });
  }

  deleteDeviceAlert(deviceAlert) {
    this.deviceAlertService.deleteDeviceAlert(deviceAlert.id)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value,"Device Alert of (id: "+deviceAlert.id+") Deleted Successfully!");
          if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
            this.getAllDeviceAlertByOrganizationId();
          } else {
            this.getAllDeviceAlert();
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

