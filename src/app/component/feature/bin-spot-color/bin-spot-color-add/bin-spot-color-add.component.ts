import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ParkingSpotService } from "src/app/services/parking-spot.service";
import { first } from "rxjs/operators";
import { WebConstants } from "src/app/util/web.constants";
import { ToastrService } from "ngx-toastr";
import { GeofenceService } from "src/app/services/geofence.service";
import { TokenStorage } from "src/app/util/token.storage";
import { Lookup } from "src/app/model/lookup";
import { BinSpotColorService } from "src/app/services/bin.spot.color.service";
import { OrganizationService } from "src/app/services/organization.service";

@Component({
  selector: "app-bin-spot-color-add",
  templateUrl: "./bin-spot-color-add.component.html",
  styleUrls: ["./bin-spot-color-add.component.scss"],
})
export class BinSpotColorAddComponent implements OnInit {
  public form: any;
  public allOrganizations: Lookup[] = [];
  public superAdmin: boolean;

  constructor(
    public dialogRef: MatDialogRef<BinSpotColorAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    //public geofenceService: GeofenceService,
    public organizationService: OrganizationService,
    public BinSpotColorService: BinSpotColorService,
    public toastrService: ToastrService,
    public tokenStorage: TokenStorage
  ) {
    ///////open by me /////
    if (this.tokenStorage.getRole() === "ROLE_SUPER_ADMIN") {
      this.superAdmin = true;
      this.getAllOrganizations();
    }
    this.initlizeForm();
  }

  ngOnInit(): void {
    // this.initlizeForm();
  }

  initlizeForm() {
    this.form = new FormGroup({
      organizationId: new FormControl("", Validators.required),
      platformName: new FormControl("", Validators.required),
      fullColor: new FormControl("", Validators.required),
      fullText: new FormControl("", Validators.required),
      partialFullColor: new FormControl("", Validators.required),
      partialFullText: new FormControl("", Validators.required),
      emptyColor: new FormControl("", Validators.required),
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
  }

  getAllOrganizations() {
    this.organizationService
      .getAllActive()
      .pipe(first())
      .subscribe((response) => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          let data = response.data;
          for (var x = 0; x < data.length; x++) {
            var obj = {
              id: data[x].id,
              name: data[x].name,
            };
            this.allOrganizations[x] = obj;
          }
        } else {
          this.toastrService.error(response.value, "Failed To Load Data!");
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

  addBinSpotColor($event: MouseEvent) {
    ($event.target as HTMLButtonElement).disabled = true;
    console.log("add Binspot color data ", this.form.getRawValue());
    let data = this.form.getRawValue();

    if (!this.superAdmin) {
      data.organizationId = this.tokenStorage.getOrganizationId();
    }

    this.BinSpotColorService.add(data)
      .pipe(first())
      .subscribe(
        (response) => {
          console.log("Listening to response", response);
          if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
            this.toastrService.success(
              response.value,
              "Data Add Successfully!"
            );
            this.dialogRef.close();
          } else {
            ($event.target as HTMLButtonElement).disabled = false;
            this.toastrService.error(response.value, "Failed To Add Data!");
          }
        },
        (error) => {
          ($event.target as HTMLButtonElement).disabled = false;
          console.error("Failed to add data", error);
        }
      );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
