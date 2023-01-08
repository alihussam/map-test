import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource, MatDialog } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TokenStorage } from 'src/app/util/token.storage';
import { GeofenceDetailAddDialogComponent } from './geofence-detail-add-dialog/geofence-detail-add-dialog.component';
import { GeofenceDetailUpdateDialogComponent } from './geofence-detail-update-dialog/geofence-detail-update-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { GeofenceDetailService } from 'src/app/services/geofence-detail.service';
import { first } from 'rxjs/operators';
import { WebConstants } from 'src/app/util/web.constants';

export interface GeofenceDetail {
  geofenceDetailId: number;
  geofenceId: number;
  sequence: string;
  lat: number;
  lng: number;
  status: number;
}

@Component({
  selector: 'app-geofence-detail',
  templateUrl: './geofence-detail.component.html',
  styleUrls: ['./geofence-detail.component.scss']
})
export class GeofenceDetailComponent implements OnInit {

  public displayedColumns: string[] = [
    'geofenceName',
    'sequence',
    'latitude',
    'longitude',
    'actions'
  ];

  public dataSource = new MatTableDataSource();
  public allGeofenceDetails: any[] = [];
  public geofenceId: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    public geofenceDetailService: GeofenceDetailService,
    public tokeStorage: TokenStorage,
    public toastrService: ToastrService) { 

      this.geofenceId = this.activatedRoute.snapshot.queryParamMap.get('geofenceId');
      this.getAllGeofenceDetialByID();
    }

  ngOnInit(): void {}

  getAllGeofenceDetialByID() {
    this.geofenceDetailService.GeofenceDetailFindByGeofenceId(this.geofenceId)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.allGeofenceDetails = response.data;
          this.dataSource = new MatTableDataSource<unknown>(this.allGeofenceDetails);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log("response ",response.data);
        } else {
          this.toastrService.error(response.value,"Failed To Load Data!")
        }
      });
  }

  addGeofenceDetailDialog() {
    let data = {geofenceid: this.geofenceId};
    const dialogRef = this.dialog.open(GeofenceDetailAddDialogComponent, {
      width: "550px",
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllGeofenceDetialByID();
    });
  }

  updateGeofenceDetailDialog(data) {
    console.log(data);
    const dialogRef = this.dialog.open(GeofenceDetailUpdateDialogComponent, {
      width: "550px",
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllGeofenceDetialByID();
    });
  }

  deleteGeofenceDetail(geofenceDetail) {
    this.geofenceDetailService.deleteGeofenceDetail(geofenceDetail.id)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value,"Geofence of (id: "+geofenceDetail.id+") Deleted Successfully!");
          this.getAllGeofenceDetialByID();
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
