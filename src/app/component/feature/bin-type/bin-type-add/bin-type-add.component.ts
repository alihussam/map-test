import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { WebConstants } from "src/app/util/web.constants";
import { ToastrService } from "ngx-toastr";
import { TokenStorage } from "src/app/util/token.storage";
import { Lookup } from "src/app/model/lookup";
import { BinSpotColorService } from "src/app/services/bin.spot.color.service";
import { OrganizationService } from "src/app/services/organization.service";
import { BinTypeService } from "src/app/services/bin.type.service";

@Component({
  selector: "app-bin-type-add",
  templateUrl: "./bin-type-add.component.html",
  styleUrls: ["./bin-type-add.component.scss"],
})
export class BinTypeAddComponent implements OnInit {
  public form: any;
  public allOrganizations: Lookup[] = [];
  public superAdmin: boolean;

  constructor(
    public dialogRef: MatDialogRef<BinTypeAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public organizationService: OrganizationService,
    public binTypeService: BinTypeService,
    public BinType: BinSpotColorService,

    public toastrService: ToastrService,
    public tokenStorage: TokenStorage
  ) {
    if (this.tokenStorage.getRole() === "ROLE_SUPER_ADMIN") {
      this.superAdmin = true;
      this.getAllOrganizations();
    }
    this.initlizeForm();
  }

  ngOnInit(): void {}

  initlizeForm() {
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

  addBinType($event: MouseEvent) {
    ($event.target as HTMLButtonElement).disabled = true;

    let data = this.form.getRawValue();

    if (!this.superAdmin) {
      data.organizationId = this.tokenStorage.getOrganizationId();
    }

    this.binTypeService
      .add(data)

      .pipe(first())
      .subscribe(
        (response) => {
          if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
            this.toastrService.success(
              response.value,
              "Data Add Successfully!"
            );
            this.dialogRef.close();
          } else {
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
