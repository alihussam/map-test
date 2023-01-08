//import { TokenStorage } from 'src/app/util/token.storage';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DesignationService } from 'src/app/services/designation.service';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { WebConstants } from 'src/app/util/web.constants';
import { TokenStorage } from 'src/app/util/token.storage';
import { ToastrService } from 'ngx-toastr';
import { OrganizationService } from 'src/app/services/organization.service';
import { Lookup } from 'src/app/model/lookup';
import { getStatusCode, getStatusList, getStatusMessage, WebUtil } from 'src/app/util/web.util';

@Component({
  selector: 'app-user-update-dialog',
  templateUrl: './user-update-dialog.component.html',
  styleUrls: ['./user-update-dialog.component.scss']
})

export class UserUpdateDialogComponent implements OnInit {
  public form: any;
  public allOrganizations: Lookup[] = [];
  public allRoles: Lookup[] = [];
  public superAdmin: boolean;
  public statusList: any = [];

  constructor(
    public dialogRef: MatDialogRef<UserUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public organizationService: OrganizationService,
    public desingationsService: DesignationService,
    public userService: UserService,
    public tokenStorage: TokenStorage,
    public toastrService: ToastrService,
    public webUtil: WebUtil,
  ) {
    if(this.tokenStorage.getRole() === "ROLE_SUPER_ADMIN"){
      this.superAdmin = true;
      this.getAllOrganizations();
    }
    this.getAllRoles();
    this.initlizeUserUpdateForm();
  }

  ngOnInit() { }

  initlizeUserUpdateForm() {

    this.statusList = getStatusList();
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      emailAddress: new FormControl('', Validators.compose([Validators.required,Validators.email])),
      phoneNumber: new FormControl('', Validators.required),
      organizationId: new FormControl('', Validators.required),
      roleId: new FormControl('', Validators.required),
      designation: new FormControl("", Validators.required),
      status: new FormControl("", Validators.required),
    });

    console.log( "user update form ",this.data);
    this.form.get('firstName').setValue(this.data.firstName);
    this.form.get('lastName').setValue(this.data.lastName);
    this.form.get('emailAddress').setValue(this.data.emailAddress);
    this.form.get('phoneNumber').setValue(this.data.phoneNumber);
    this.form.get('designation').setValue(this.data.designation);
    this.form.get('status').setValue(getStatusMessage(this.data.status));
    
    if(this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN"){
      this.form.get("organizationId").disable();
      this.form.get("emailAddress").disable();
    }else
    if(this.tokenStorage.getRole() === "ROLE_SUPER_ADMIN" && this.tokenStorage.getUserId() === this.data.userId){
      this.form.get("emailAddress").disable();
    }
    
  }

  getAllOrganizations() {
    this.organizationService.getAll()
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          console.log(response.data);
          let data = response.data;
          console.log("agha",this.data)
          for (var x = 0; x < data.length; x++) {
            var obj = {
              id: data[x].id,
              name: data[x].name,
            }
            this.allOrganizations[x] = obj;
          }
          for (var x = 0; x < this.allOrganizations.length; x++) {
            if (this.data.organizationId == this.allOrganizations[x].id)
             {
              this.form.controls['organizationId'].setValue(this.allOrganizations[x].id);
            }
          }
        } else {
          this.toastrService.error(response.value,"Failed To Load Data!")
        }
      });
  }

  getAllRoles() {
    this.desingationsService.getAllDesingationsActive()
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          console.log(response.data);

          let data = response.data;
          
          for (var x = 0; x < data.length; x++) {
            var obj = {
              id: data[x].id,
              name: data[x].description,
            }
            this.allRoles[x] = obj;
          }
          for (var x = 0; x < this.allRoles.length; x++) {
            if (this.data.roleId == this.allRoles[x].id) {
              this.form.controls['roleId'].setValue(this.allRoles[x].id);
            }
          }
        } else {
          this.toastrService.error(response.value,"Failed To Load Data!")
        }
      });
  }



  ////////////

/////Avtive without superadmin
  // getAllRoles() {
  //   this.desingationsService.getAllDesingationsActive()
  //     .pipe(first())
  //     .subscribe(response => {
  //       if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
  //         console.log(response.data);

  //         let data = response.data;
          
  //         for (var x = 0; x < data.length; x++) {
  //           var obj = {
  //             id: data[x].id,
  //             name: data[x].name,
  //           }
  //           this.allRoles[x] = obj;
  //         }
  //         for (var x = 0; x < this.allRoles.length; x++) {
  //           if (this.data.role.id == this.allRoles[x].id) {
  //             this.form.controls['roleId'].setValue(this.allRoles[x].id);
  //           }
  //         }
  //       } else {
  //         this.toastrService.error(response.value,"Failed To Load Data!")
  //       }
  //     });
  // }

  //  //////


  closeDialog(): void {
    this.dialogRef.close();
  }

  updateUserData() {
    console.log(this.form.getRawValue());
    let updatedData = this.form.getRawValue();
    updatedData.id = this.data.userId;
    updatedData.password = this.data.password;
    // updatedData.organizationId = this.tokenStorage.getOrganizationId();

    if (!this.superAdmin) {
      updatedData.organizationId = this.tokenStorage.getOrganizationId();
     }
     
    this.userService.updateUser(updatedData)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value,"User Updated Successfully!");
          this.dialogRef.close();
        } else {
          this.toastrService.error(response.value,"Failed To Updated Data!")
        }
      });
  }

  checkRole(){
    if(this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN"){
      return true;
    }
    else{
      return false;
    }
  }
}
