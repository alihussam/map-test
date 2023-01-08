import { UserUpdateDialogComponent } from "./user-update-dialog/user-update-dialog.component";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { first } from "rxjs/operators";
import { WebConstants } from "../../../util/web.constants";
import { UserService } from "../../../services/user.service";
import { MatDialog } from "@angular/material/dialog";
import { UserAddDialogComponent } from "./user-add-dialog/user-add-dialog.component";
import { UserAssignPrivilegesDialogComponent } from "./user-assign-privileges-dialog/user-assign-privileges-dialog.component";
import { FormBuilder } from "@angular/forms";
import { TokenStorage } from "src/app/util/token.storage";
import { ToastrService } from "ngx-toastr";
import { UserAssignDealerDialogComponent } from "./user-assign-dealer-dialog/user-assign-dealer-dialog.component";
import { Router } from "@angular/router";

export interface Users {
  userId: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  designation: string;
  stores?: any;
  managerName?: any;
  organization: string;
}

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  public displayedColumns: string[] = [
    //'orgname',
    "organizationName",
    "firstName",
    "lastName",
    "emailAddress",
    "phoneNumber",
    //'roleName',
    "roleDescription",
    "designation",
    "status",
    "actions",
  ];

  public dataSource = new MatTableDataSource();
  public allUsers: any[] = [];
  user: any = [];
  public tempId: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {}

  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    public userService: UserService,
    public tokenStorage: TokenStorage,
    public toastrService: ToastrService,
    private router: Router
  ) {
    // this.getAllUsers();
    if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
      this.getUserByOrganization();
    } else {
      this.getAllUsers();
    }
  }

  getAllUsers() {
    this.userService
      .getAll()
      .pipe(first())
      .subscribe((response) => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.allUsers = response.data;

          this.allUsers = this.allUsers.map((user) => {
            if (user.status != null) {
              if (user.status == 1) {
                user.status = "Active";
              } else if (user.status == 2) {
                user.status = "Inactive";
              }
            } else {
              user.status = "Inactive";
            }

            return user;
          });

          this.dataSource = new MatTableDataSource<unknown>(this.allUsers);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log("response ", this.allUsers);
        } else {
          this.toastrService.error(response.value, "Failed To Load Data!");
        }
      });
  }

  getUserByOrganization() {
    this.userService
      .findUserOrganizations(this.tokenStorage.getOrganizationId())
      .pipe(first())
      .subscribe((response) => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.allUsers = response.data;

          for (let i = 0; i < this.allUsers.length; i++) {
            console.log("this.organization[i].status", this.allUsers[i].status);
            // if(this.organizations.status != null){

            //////////////
            // if(this.allUsers[i].status == 1){
            //   this.allUsers[i].active = "Active";

            // }else if (this.allUsers[i].status == 2){
            //   this.allUsers[i].active ="Inactive"
            // }

            //////////

            // }
            // else{
            //   this.organizations[i].active ="Inactive"
            // }
          }

          this.dataSource = new MatTableDataSource<unknown>(this.allUsers);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log("response ", this.allUsers);
        } else {
          this.toastrService.error(response.value, "Failed To Load Data!");
        }
      });
  }

  getTempId(obj: any) {
    this.tempId = obj;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addUserDialog() {
    const dialogRef = this.dialog.open(UserAddDialogComponent, {
      data: null,
    });
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (this.tokenStorage.getRole() !== WebConstants.USER_ROLE.SUPER_ADMIN) {
        this.getUserByOrganization();
      } else {
        this.getAllUsers();
      }
    });
  }

  updateUserDialog(data) {
    console.log(data);
    const dialogRef = this.dialog.open(UserUpdateDialogComponent, {
      data: data,
    });

    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (this.tokenStorage.getRole() !== WebConstants.USER_ROLE.SUPER_ADMIN) {
        this.getUserByOrganization();
      } else {
        this.getAllUsers();
      }
    });
  }

  assignPrivilages(data) {
    console.log(data.userId);
    const dialogRef = this.dialog.open(UserAssignPrivilegesDialogComponent, {
      width: "550px",
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (this.tokenStorage.getRole() !== WebConstants.USER_ROLE.SUPER_ADMIN) {
        this.getUserByOrganization();
      } else {
        this.getAllUsers();
      }
    });
  }

  assignDealer(data) {
    console.log(data.userId);
    const dialogRef = this.dialog.open(UserAssignDealerDialogComponent, {
      width: "550px",
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (this.tokenStorage.getRole() !== WebConstants.USER_ROLE.SUPER_ADMIN) {
        this.getUserByOrganization();
      } else {
        this.getAllUsers();
      }
    });
  }

  deleteUser(user) {
    this.userService
      .deleteUser(user.userId)
      .pipe(first())
      .subscribe((response) => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(
            response.value,
            "User Deleted Successfully!"
          );
          if (
            this.tokenStorage.getRole() !== WebConstants.USER_ROLE.SUPER_ADMIN
          ) {
            this.getUserByOrganization();
          } else {
            this.getAllUsers();
          }
        } else {
          this.toastrService.error(response.value, "Failed To Delete Data!");
        }
      });
  }

  // terminateUser(element){
  //   this.userService.terminateUser(element.userId)
  //   .pipe(first())
  //   .subscribe(response => {
  //     if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
  //       this.toastrService.success(response.value,"User Terminated Successfully!");
  //       console.log("response ",response);
  //       if (this.tokenStorage.getRole() !== WebConstants.USER_ROLE.SUPER_ADMIN) {
  //         this.getUserByOrganization();
  //       } else {
  //         this.getAllUsers();
  //       }
  //     } else {
  //       this.toastrService.error(response.value,"Failed To Terminate Data!")
  //     }
  //   });
  // }

  checkRole() {
    if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
      return true;
    } else {
      return false;
    }
  }
}
