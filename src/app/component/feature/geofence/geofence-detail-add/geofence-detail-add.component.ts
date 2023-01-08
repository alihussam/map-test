import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { GeofenceDetailService } from 'src/app/services/geofence-detail.service';
import { TokenStorage } from 'src/app/util/token.storage';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { WebConstants } from 'src/app/util/web.constants';

@Component({
  selector: 'app-geofence-detail-add',
  templateUrl: './geofence-detail-add.component.html',
  styleUrls: ['./geofence-detail-add.component.scss']
})
export class GeofenceDetailAddComponent implements OnInit {

  public form: any;
  public displayedColumns: string[] = [
    'geofence',
    'sequence',
    'latitude',
    'longitude',
    'actions'
  ];

  public dataSource = new MatTableDataSource();
  public allGeofenceDetails: any[] = [];
  public ActionBtn = "Add";
  public selectedGeofenceDetail: any = {};

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<GeofenceDetailAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private geofenceDetailService: GeofenceDetailService,
    public tokenStorage: TokenStorage,
    public toastrService: ToastrService
  ) { 
    this.initlizeGeofenceDetailForm();
    this.getAllGeofenceDetialByID();
  }

  ngOnInit(): void {
  }

  initlizeGeofenceDetailForm() {
    this.form = new FormGroup({
      sequence: new FormControl(""),
      latitude: new FormControl("", Validators.required),
      longitude: new FormControl("", Validators.required),
    });
  }

  getAllGeofenceDetialByID() {
    this.geofenceDetailService.GeofenceDetailFindByGeofenceId(this.data.id)
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

  deleteGeofenceDetail(geofenceDetail) {
    this.geofenceDetailService.deleteGeofenceDetail(geofenceDetail.id)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value,"Geofence of (id: "+this.data.id+") Deleted Successfully!");
          this.getAllGeofenceDetialByID();
        } else {
          this.toastrService.error(response.value,"Failed To Delete Data!")
        }
      });
  }

  submit(){
    if(this.ActionBtn=="Add"){
      this.addGeofenceDetailData();
    }else{
      this.updateGeofenceDetailData();
    }
  }

  addGeofenceDetailData() {
    console.log("add Geofence data ",this.form.getRawValue() );
    let data = this.form.getRawValue()
    data.geofenceid = this.data.id;
    this.geofenceDetailService.addGeofenceDetail(data)
      .pipe(first())
      .subscribe(response => {
        if(response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value,"Data Add Successfully!");
          this.ActionBtn="Add";
          this.form.reset();
          this.getAllGeofenceDetialByID();
        } else {
          this.toastrService.error(response.value,"Failed To Add Data!")
        }
      });
  }

  updateGeofenceDetailData() {
    console.log("update Geofence data ",this.form.getRawValue() );
    let updatedData = this.form.getRawValue()
    updatedData.id = this.selectedGeofenceDetail.id;
    updatedData.geofenceid = this.data.id;
    this.geofenceDetailService.updateGeofenceDetail(updatedData)
      .pipe(first())
      .subscribe(response => {
        if(response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value,"Data Updated Successfully!");
          this.ActionBtn="Add";
          this.form.reset();
          this.getAllGeofenceDetialByID();
        } else {
          this.toastrService.error(response.value,"Failed To Update Data!")
        }
      });
  }

  update(element){
    this.ActionBtn = "Edit";
    this.selectedGeofenceDetail = element;

    this.form.get('sequence').setValue(element.sequence);
    this.form.get('latitude').setValue(element.latitude);
    this.form.get('longitude').setValue(element.longtitude);
    
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
