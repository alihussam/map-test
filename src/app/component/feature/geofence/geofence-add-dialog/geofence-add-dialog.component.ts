import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { TokenStorage } from 'src/app/util/token.storage';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { GeofenceService } from 'src/app/services/geofence.service';
import { DealerService } from 'src/app/services/dealer.service';
import { first } from 'rxjs/operators';
import { WebConstants } from 'src/app/util/web.constants';
import { Lookup } from 'src/app/model/lookup';


@Component({
  selector: 'app-geofence-add-dialog',
  templateUrl: './geofence-add-dialog.component.html',
  styleUrls: ['./geofence-add-dialog.component.scss']
})
export class GeofenceAddDialogComponent implements OnInit {

  public form: any;
  public allDealers: Lookup[] = [];

  constructor(
    public dialogRef: MatDialogRef<GeofenceAddDialogComponent>,
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
    this.initlizeGeofenceAddForm();
  }

  ngOnInit() { }  

  initlizeGeofenceAddForm() {
    this.form = new FormGroup({
      geofenceName: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      dealerId: new FormControl("", Validators.required),
    });
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
          console.log("response ",response.data);
        } else {
          this.toastrService.error(response.value,"Failed To Load Data!")
        }
      });
  }

  addGeofenceData() {
    console.log("add Geofence data ",this.form.getRawValue() );
    let data = this.form.getRawValue()
    this.geofenceService.addGeofence(data)
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


