import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TokenStorage } from 'src/app/util/token.storage';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeofenceService } from 'src/app/services/geofence.service';
import { DealerService } from 'src/app/services/dealer.service';
import { first } from 'rxjs/operators';
import { WebConstants } from 'src/app/util/web.constants';
import { Lookup } from 'src/app/model/lookup';

@Component({
  selector: 'app-geofence-update-dialog',
  templateUrl: './geofence-update-dialog.component.html',
  styleUrls: ['./geofence-update-dialog.component.scss']
})
export class GeofenceUpdateDialogComponent implements OnInit {

  public form: any;
  public allDealers: Lookup[] = [];

  constructor(
    public dialogRef: MatDialogRef<GeofenceUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public geofenceService: GeofenceService,
    public dealerService: DealerService,
    public tokenStorage: TokenStorage,
    public toastrService: ToastrService
  ) {
    if(this.tokenStorage.getRole() !== "ROLE_SUPER_ADMIN"){    
      this.getAllDealersByOrganizationId();
    }else{
      this.getAllDealers();
    }
    this.initlizeGeofenceUpdateForm();
  }

  ngOnInit() { }  

  initlizeGeofenceUpdateForm() {
    this.form = new FormGroup({
      geofenceName: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      dealerId: new FormControl("", Validators.required),
    });

    this.form.get('geofenceName').setValue(this.data.geofenceName);
    this.form.get('description').setValue(this.data.description);
  }

  getAllDealers() {
    this.dealerService.getAll()
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          let data = response.data;
          for (var x = 0; x < data.length; x++) {
            var obj = {
              id: data[x].id,
              name: data[x].dealershipName,
            }
            this.allDealers[x] = obj;
          }
          for (var x = 0; x < this.allDealers.length; x++) {            
            if (this.data.dealer.id == this.allDealers[x].id) {
              this.form.controls['dealerId'].setValue(this.allDealers[x].id);
            }
          }
        } else {
          this.toastrService.error(response.value,"Failed To Load Data!")
        }
      });
  }

  getAllDealersByOrganizationId(){
    this.dealerService.findDealerByOrganizationId(this.tokenStorage.getOrganizationId())
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          let data = response.data;
          
          for (var x = 0; x < data.length; x++) {
            var obj = {
              id: data[x].id,
              name: data[x].dealershipName,
            }
            this.allDealers[x] = obj;
          }
          for (var x = 0; x < this.allDealers.length; x++) {
            if (this.data.dealer.id === this.allDealers[x].id) {
              this.form.controls['dealerId'].setValue(this.allDealers[x].id);
            }
          }
          console.log("response ",response.data);
        } else {
          this.toastrService.error(response.value,"Failed To Load Data!")
        }
      });
  }

  updateGeofenceData() {
    console.log("update Geofence data ",this.form.getRawValue() );
    let updatedData = this.form.getRawValue()
    updatedData.id = this.data.id;
    this.geofenceService.updateGeofence(updatedData)
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