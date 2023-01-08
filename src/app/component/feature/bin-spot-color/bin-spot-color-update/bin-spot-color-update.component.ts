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
import { BinSpotColorService } from "src/app/services/bin.spot.color.service";
import { OrganizationService } from "src/app/services/organization.service";
import {
  getStatusCode,
  getStatusList,
  getStatusMessage,
  WebUtil,
} from "src/app/util/web.util";

//
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/debounceTime";

//

@Component({
  selector: "app-bin-spot-color-update",
  templateUrl: "./bin-spot-color-update.component.html",
  styleUrls: ["./bin-spot-color-update.component.scss"],
})
export class BinSpotColorUpdateComponent implements OnInit {
  public form: any;
  public allOrganizations: Lookup[] = [];
  public superAdmin: boolean;
  public statusList: any = [];
  //public status: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<BinSpotColorUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public geofenceService: GeofenceService,
    public BinSpotColorService: BinSpotColorService,
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

  ngOnInit(): void {
    //this.initlizeForm();
  }

  initlizeForm() {
    this.statusList = getStatusList();
    this.form = new FormGroup({
      organizationId: new FormControl("", Validators.required),
      platformName: new FormControl("", Validators.required),
      fullColor: new FormControl("", Validators.required),
      fullText: new FormControl("", Validators.required),
      partialFullColor: new FormControl("", Validators.required),
      partialFullText: new FormControl("", Validators.min(75)),
      emptyColor: new FormControl("", Validators.max(40)),
      emptyText: new FormControl("", Validators.required),
      fireColor: new FormControl("", Validators.required),
      fireText: new FormControl("", Validators.required),
      fallenColor: new FormControl("", Validators.required),
      fallenText: new FormControl("", Validators.required),
      status: new FormControl("", Validators.required),
    });

    if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
      this.form.get("organizationId").disable();
    }

    //this.data.status = this.data.status === "Active" ? 1 : 2;

    this.form.get("organizationId").setValue(this.data.organizationId);
    this.form.get("platformName").setValue(this.data.platformName);
    this.form.get("fullColor").setValue(this.data.fullColor);
    this.form.get("fullText").setValue(this.data.fullText);
    this.form.get("partialFullColor").setValue(this.data.partialFullColor);
    this.form.get("partialFullText").setValue(this.data.partialFullText);
    this.form.get("emptyColor").setValue(this.data.emptyColor);
    this.form.get("emptyText").setValue(this.data.emptyText);
    this.form.get("fireColor").setValue(this.data.fireColor);
    this.form.get("fireText").setValue(this.data.fireText);
    this.form.get("fallenColor").setValue(this.data.fallenColor);
    this.form.get("fallenText").setValue(this.data.fallenText);
    this.form.get("status").setValue(getStatusMessage(this.data.status));
  }

  //updated.binSpotColorId

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

  updateSpotColor() {
    console.log("update spot color Data ", this.form.getRawValue());
    let updatedData = this.form.getRawValue();
    updatedData.binSpotColorId = this.data.binSpotColorId;
    //updatedData.status = updatedData.status === "Active" ? 1 : 2;

    console.log("updatedData={}", updatedData);

    this.BinSpotColorService.update(updatedData)
      .pipe(first())
      .subscribe(
        (response) => {
          if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
            this.toastrService.success(
              response.value,
              "Data Updated Successfully!"
            );
            this.dialogRef.close();
          } else {
            this.toastrService.error(response.value, "Failed To Update Data!");
          }
        },
        (error) => {
          // ($event.target as HTMLButtonElement).disabled = false;
          console.error("Failed to add data", error);
        }
      );
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
