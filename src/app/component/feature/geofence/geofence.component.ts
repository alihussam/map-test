import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource, MatDialog } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { TokenStorage } from 'src/app/util/token.storage';
import { ToastrService } from 'ngx-toastr';
import { GeofenceAddDialogComponent } from './geofence-add-dialog/geofence-add-dialog.component';
import { GeofenceUpdateDialogComponent } from './geofence-update-dialog/geofence-update-dialog.component';
import { Router } from '@angular/router';
import { GeofenceService } from 'src/app/services/geofence.service';
import { first } from 'rxjs/operators';
import { WebConstants } from 'src/app/util/web.constants';
import { GeofenceFileUploaderComponent } from './geofence-file-uploader/geofence-file-uploader.component';
import { GeofenceDetailAddComponent } from './geofence-detail-add/geofence-detail-add.component';

export interface Geofence {
  geofenceId: number;
  name: string;
  description: string;
  idDealership: number;
  status: number;
}

@Component({
  selector: 'app-geofence',
  templateUrl: './geofence.component.html',
  styleUrls: ['./geofence.component.scss']
})
export class GeofenceComponent implements OnInit {
  public displayedColumns: string[] = [
    'geofenceName',
    'description',
    'dealerName',
    'actions'
  ];

  public dataSource = new MatTableDataSource();
  public allGeofences: any[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router : Router,
    public geofenceService: GeofenceService,
    public tokenStorage: TokenStorage,
    public toastrService: ToastrService) { 
      if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
        this.findGeofenceByOrganizationId();
      } else {
        this.getAllGeofence();
      }
    }

  ngOnInit(): void {
  }

  getAllGeofence() {
    this.geofenceService.getAll()
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.allGeofences = response.data;
          this.dataSource = new MatTableDataSource<unknown>(this.allGeofences);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log("response ",response.data);
        } else {
          this.toastrService.error(response.value,"Failed To Load Data!")
        }
      });
  }

  findGeofenceByOrganizationId(){
    this.geofenceService.findGeofenceByOrganizationId(this.tokenStorage.getOrganizationId())
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.allGeofences = response.data;
          this.dataSource = new MatTableDataSource<unknown>(this.allGeofences);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log("response ",response.data);
        } else {
          this.toastrService.error(response.value,"Failed To Load Data!")
        }
      });
  }

  addGeofenceDialog() {
    const dialogRef = this.dialog.open(GeofenceAddDialogComponent, {
      width: "550px",
      data: null,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
        this.findGeofenceByOrganizationId();
      } else {
        this.getAllGeofence();
      }
    });
  }

  updateGeofenceDialog(data) {
    console.log(data);
    const dialogRef = this.dialog.open(GeofenceUpdateDialogComponent, {
      width: "550px",
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
        this.findGeofenceByOrganizationId();
      } else {
        this.getAllGeofence();
      }
    });
  }

  fileUploaderDialog(){
    const dialogRef = this.dialog.open(GeofenceFileUploaderComponent, {
      width: '550px',
      data: null,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
        this.findGeofenceByOrganizationId();
      } else {
        this.getAllGeofence();
      }
    });
  }

  deleteGeofence(geofence) {
    this.geofenceService.deleteGeofence(geofence.id)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value,"Geofence of (id: "+geofence.id+") Deleted Successfully!");
          if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
            this.findGeofenceByOrganizationId();
          } else {
            this.getAllGeofence();
          }
        } else {
          this.toastrService.error(response.value,"Failed To Delete Data!")
        }
      });
  }

  // geofenceDetail(element){
  //   this.router.navigate(['admin/geofence/geofence-detail'], {
  //     queryParams: { 
  //         geofenceId: element.id
  //     }, 
  //     skipLocationChange : true 
  //   });
  // }

  geofenceDetail(data){
    console.log(data);
    const dialogRef = this.dialog.open(GeofenceDetailAddComponent, {
      width: "1500px",
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
        this.findGeofenceByOrganizationId();
      } else {
        this.getAllGeofence();
      }
    });
  }

  mapView(element: any){
    console.log("element ",element);

    this.router.navigate([WebConstants.WEB_URL.MAP_VIEW], {
          queryParams: { 
            geofenceId: element.id
          }, 
          skipLocationChange : false,
        });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

