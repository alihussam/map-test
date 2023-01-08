import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ParkingSpotService } from "src/app/services/parking-spot.service";
import { ToastrService } from "ngx-toastr";
import { first } from "rxjs/operators";
import { WebConstants } from "src/app/util/web.constants";
import { GeofenceService } from "src/app/services/geofence.service";
import { TokenStorage } from "src/app/util/token.storage";
import { Lookup } from "src/app/model/lookup";
import { OrganizationService } from "src/app/services/organization.service";
import {
  getStatusCode,
  getStatusList,
  getStatusMessage,
  WebUtil,
} from "src/app/util/web.util";
import { BinTypeService } from "src/app/services/bin.type.service";

@Component({
  selector: "app-bin-type-update",
  templateUrl: "./bin-type-update.component.html",
  styleUrls: ["./bin-type-update.component.scss"],
})
export class BinTypeUpdateComponent implements OnInit {
  public form: any;
  public allOrganizations: Lookup[] = [];
  public superAdmin: boolean;
  public statusList: any = [];
  //public status: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<BinTypeUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public geofenceService: GeofenceService,
    public BinTypeService: BinTypeService,
    public organizationService: OrganizationService,
    public toastrService: ToastrService,
    public tokenStorage: TokenStorage,
    public webUtil: WebUtil
  ) {
    if (this.tokenStorage.getRole() === "ROLE_SUPER_ADMIN") {
      this.superAdmin = true;
      this.getAllOrganizations();
    }
    this.initlizeForm();
  }

  ngOnInit(): void {}

  initlizeForm() {
    this.statusList = getStatusList();
    this.form = new FormGroup({
      organizationId: new FormControl("", Validators.required),
      binType: new FormControl("", Validators.required),
      binTypeDescription: new FormControl("", Validators.required),
      binTypeHeight: new FormControl("", Validators.required),
      status: new FormControl("", Validators.required),
    });

    if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
      this.form.get("organizationId").disable();
    }

    //this.data.status = this.data.status === "Active" ? 1 : 2;

    this.form.get("organizationId").setValue(this.data.organizationId);
    this.form.get("binType").setValue(this.data.binType);
    this.form.get("binTypeDescription").setValue(this.data.binTypeDescription);
    this.form.get("binTypeHeight").setValue(this.data.binTypeHeight);

    this.form.get("status").setValue(getStatusMessage(this.data.status));
  }

  getAllOrganizations() {
    this.organizationService
      .getAllActive()
      .pipe(first())
      .subscribe((response) => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          console.log(response.data);
          let data = response.data;
          for (var x = 0; x < data.length; x++) {
            var obj = {
              id: data[x].id,
              name: data[x].name,
            };
            this.allOrganizations[x] = obj;
          }
          for (var x = 0; x < this.allOrganizations.length; x++) {
            if (this.data.organizationId == this.allOrganizations[x].id) {
              this.form.controls["organizationId"].setValue(
                this.allOrganizations[x].id
              );
            }
          }
        } else {
          this.toastrService.error(response.value, "Failed To Load Data!");
        }
      });
  }

  updateBinTypeColor() {
    //console.log("update spot color Data ", this.form.getRawValue());
    let updatedData = this.form.getRawValue();
    updatedData.id = this.data.id;
    //updatedData.status = updatedData.status === "Active" ? 1 : 2;

    //console.log("updatedData={}", updatedData);

    this.BinTypeService.update(updatedData)
      .pipe(first())
      .subscribe((response) => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(
            response.value,
            "Data Updated Successfully!"
          );
          this.dialogRef.close();
        } else {
          this.toastrService.error(response.value, "Failed To Update Data!");
        }
      });
  }

  checkRole() {
    if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
      return true;
    } else {
      return false;
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
