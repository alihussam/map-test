import { UserService } from "./../../../../services/user.service";
import { DesignationService } from "./../../../../services/designation.service";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { first } from "rxjs/operators";
import { Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { WebConstants } from "src/app/util/web.constants";
import { ToastrService } from "ngx-toastr";
import { TokenStorage } from "src/app/util/token.storage";
import { OrganizationService } from "src/app/services/organization.service";
import { Lookup } from "src/app/model/lookup";
import { isThisISOWeek } from "date-fns";

@Component({
  selector: "app-user-add-dialog",
  templateUrl: "./user-add-dialog.component.html",
  styleUrls: ["./user-add-dialog.component.scss"],
})
export class UserAddDialogComponent implements OnInit {
  public form: any;
  public allOrganizations: Lookup[] = [];
  public allRoles: Lookup[] = [];
  public superAdmin: boolean;

  constructor(
    public dialogRef: MatDialogRef<UserAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public organizationService: OrganizationService,
    public desingationsService: DesignationService,
    public userService: UserService,
    public tokenStorage: TokenStorage,
    public toastrService: ToastrService
  ) {
    this.getAllRoles();

    ///////open by me /////
    if (this.tokenStorage.getRole() === "ROLE_SUPER_ADMIN") {
      this.superAdmin = true;
      this.getAllOrganizations();
    }
    this.initlizeUserAddForm();
  }

  ngOnInit() {}

  initlizeUserAddForm() {
    this.form = new FormGroup({
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      emailAddress: new FormControl(
        "",
        Validators.compose([Validators.email, Validators.required])
      ),
      password: new FormControl(
        "",
        Validators.compose([Validators.minLength(5), Validators.maxLength(10)])
      ),
      //compose([Validators.min(75), Validators.max(100)])
      phoneNumber: new FormControl("", Validators.required),
      ////////open by AMK //////
      organizationId: new FormControl("", Validators.required),
      roleId: new FormControl("", Validators.required),
      designation: new FormControl("", Validators.required),
      status: new FormControl("", Validators.required),
    });

    /////////////open by AMK
    if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
      this.form.get("organizationId").disable();
    }
  }

  ///////////////////
  ///////////open by AMk//////////
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

  getAllRoles() {
    this.desingationsService
      .getAllDesingationsActive()
      .pipe(first())
      .subscribe((response) => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          let data = response.data;
          for (var x = 0; x < data.length; x++) {
            var obj = {
              id: data[x].id,
              name: data[x].description,
            };
            this.allRoles[x] = obj;
          }
        } else {
          this.toastrService.error(response.value, "Failed To Load Data!");
        }
      });
  }

  addUserData($event: MouseEvent) {
    ($event.target as HTMLButtonElement).disabled = true;
    let data = this.form.getRawValue();

    if (!this.superAdmin) {
      data.organizationId = this.tokenStorage.getOrganizationId();
    }

    this.userService
      .addUser(data)

      .pipe(first())
      .subscribe((response) => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(
            response.value,
            "User Added Successfully!"
          );
          this.dialogRef.close();
        } else {
          this.toastrService.error(response.value, "Failed To Load Data!");
        }
      });
  }
  /////////////open by me
  checkRole() {
    console.log("Role check", this.tokenStorage.getRole());
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
