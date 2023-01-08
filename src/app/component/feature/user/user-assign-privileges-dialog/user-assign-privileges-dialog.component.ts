import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatTableDataSource
} from "@angular/material";
import { UserAddDialogComponent } from "../user-add-dialog/user-add-dialog.component";
import { first } from "rxjs/operators";
import { WebConstants } from "src/app/util/web.constants";
import { FormControl } from "@angular/forms";
import { UserService } from 'src/app/services/user.service';
import { PrivilegesService } from 'src/app/services/privileges.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-assign-privileges-dialog',
  templateUrl: './user-assign-privileges-dialog.component.html',
  styleUrls: ['./user-assign-privileges-dialog.component.scss']
})
export class UserAssignPrivilegesDialogComponent implements OnInit {

  public displayedColumns: string[] = ["name", "actions"];
  public dataSource = new MatTableDataSource();
  public allPrivileges: any[] = [];
  public toggle = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<UserAssignPrivilegesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService,
    public privilegesService:PrivilegesService,
    public toastrService: ToastrService
  ) {
    this.getAllprivileges();
  }

  ngOnInit() {}



  getAllprivileges() {
    this.privilegesService.getAll().pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          let data = response.data;
          for (var x = 0; x < data.length; x++) {
            var obj = {
              id: data[x].id,
              name: data[x].description,
              check: false,
              disable : false
            };
            this.allPrivileges[x] = obj;
          }
          this.dataSource = new MatTableDataSource<unknown>(this.allPrivileges);
          this.getUserprivileges(this.data.userId);
        } else {
          this.toastrService.error(response.value,"Error Loading Data");
        }
      });
    
  }

  getUserprivileges(userId) {
    console.log("inside User Privilege ",userId);
    this.userService.findUserPrivilages(userId).pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          console.log(response.data);
          let data = response.data;
          for (var x = 0; x < data.length; x++) {
            for (var c = 0; c < this.allPrivileges.length; c++) {
              if (data[x].privilegeId == this.allPrivileges[c].id) {
                if (data[x].rolePrivilege == true) {
                  this.allPrivileges[c].disable = true;
                  this.allPrivileges[c].check = true;
                } else {
                  this.allPrivileges[c].check = true;
                  this.allPrivileges[c].disable = false;
                }
              }
            }
          }
          this.dataSource = new MatTableDataSource<unknown>(this.allPrivileges);
        } else {
          this.toastrService.error(response.value,"Error Loading Data");
        }
      });
  }

  onChange(data) {
    let userId = this.data.userId;
    let privilegeId = data.id;
    if (this.toggle.value == true) {
      this.addprivilege(userId , privilegeId);
    } else {
      this.deleteprivilege(userId , privilegeId);
    }
  }

  addprivilege(userId , privilegeId) {
    let data = {userid: userId, privilegeid:privilegeId}
    this.userService.addUserPrivilage(data).pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          console.log(response);
          this.toastrService.success(response.value , "Privilege Added");
        } else {
          this.toastrService.error(response.value, "Error Adding Privilege");
        }
      });
  }

  deleteprivilege(userId , privilegeId) {  
    this.userService.deleteUserPrivilage(userId, privilegeId).pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          console.log(response);
          this.toastrService.success(response.value , "Privilege Removed");
        } else {
          this.toastrService.error(response.value, "Error Removing Privilege");
        }
      });
  }
  
  closeDialog(): void {
    this.dialogRef.close();
  }
}