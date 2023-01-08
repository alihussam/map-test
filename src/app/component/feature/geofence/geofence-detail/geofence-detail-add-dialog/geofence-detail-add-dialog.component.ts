import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TokenStorage } from 'src/app/util/token.storage';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeofenceDetailService } from 'src/app/services/geofence-detail.service';
import { first } from 'rxjs/operators';
import { WebConstants } from 'src/app/util/web.constants';
import { GeofenceService } from 'src/app/services/geofence.service';



@Component({
  selector: 'app-geofence-detail-add-dialog',
  templateUrl: './geofence-detail-add-dialog.component.html',
  styleUrls: ['./geofence-detail-add-dialog.component.scss']
})
export class GeofenceDetailAddDialogComponent implements OnInit {

  public form: any;

  constructor(
    public dialogRef: MatDialogRef<GeofenceDetailAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private geofenceDetailService: GeofenceDetailService,
    //private geofenceService: GeofenceService,
    public tokenStorage: TokenStorage,
    public toastrService: ToastrService
  ) {
    //this.getAllGeofence();
    this.initlizeGeofenceDetailAddForm();
  }

  ngOnInit() { }  

  initlizeGeofenceDetailAddForm() {
    this.form = new FormGroup({
      //geofenceid: new FormControl("", Validators.required),
      sequence: new FormControl(""),
      latitude: new FormControl("", Validators.required),
      longitude: new FormControl("", Validators.required),
    });
  }

  addGeofenceDetailData() {
    console.log("add Geofence data ",this.form.getRawValue() );
    let data = this.form.getRawValue()
    data.geofenceId = this.data.geofenceId;
    this.geofenceDetailService.addGeofenceDetail(data)
      .pipe(first())
      .subscribe(response => {
        if(response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value,"Data Add Successfully!");
          this.dialogRef.close();
        } else {
          this.toastrService.error(response.value,"Failed To Add Data!")
        }
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
