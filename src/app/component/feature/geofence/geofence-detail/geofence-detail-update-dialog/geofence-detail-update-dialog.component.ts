import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TokenStorage } from 'src/app/util/token.storage';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeofenceDetailService } from 'src/app/services/geofence-detail.service';
import { GeofenceService } from 'src/app/services/geofence.service';
import { first } from 'rxjs/operators';
import { WebConstants } from 'src/app/util/web.constants';

// export interface Geofence {
//   id: number;
//   name: string;
// }


@Component({
  selector: 'app-geofence-detail-update-dialog',
  templateUrl: './geofence-detail-update-dialog.component.html',
  styleUrls: ['./geofence-detail-update-dialog.component.scss']
})
export class GeofenceDetailUpdateDialogComponent implements OnInit {

  public form: any;
  //public allGeofence: Geofence[] = [];

  constructor(
    public dialogRef: MatDialogRef<GeofenceDetailUpdateDialogComponent>,
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

    this.form.get('sequence').setValue(this.data.sequence);
    this.form.get('latitude').setValue(this.data.latitude);
    this.form.get('longitude').setValue(this.data.longitude);
  }

  // getAllGeofence() {
  //   this.geofenceService.getAll()
  //  .pipe(first())
  //  .subscribe(response => {
  //      if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
  //        let data = response.data;
  //        for (var x = 0; x < data.length; x++) {
  //          var obj = {
  //            id: data[x].id,
  //            name: data[x].geofencename,
  //          }
  //          this.allGeofence[x] = obj;
  //        }
  //        for (var x = 0; x < this.allGeofence.length; x++) {
  //         if (this.data.geofence.id === this.allGeofence[x].id) {
  //           this.form.controls['geofenceid'].setValue(this.allGeofence[x].id);
  //         }
  //       }
  //      } else {
  //       this.toastrService.error(response.value,"Failed To Load Data!")
  //      }
  //    });
  //  }

  updateGeofenceDetailData() {
    console.log("update Geofence data ",this.form.getRawValue() );
    let updatedData = this.form.getRawValue()
    updatedData.id = this.data.id;
    updatedData.geofenceId = this.data.geofenceId;
    this.geofenceDetailService.updateGeofenceDetail(updatedData)
      .pipe(first())
      .subscribe(response => {
        if(response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value,"Data Updated Successfully!");
          this.dialogRef.close();
        } else {
          this.toastrService.error(response.value,"Failed To Update Data!")
        }
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
