import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatDialog, MatTableDataSource } from "@angular/material";
import { OrganizationService } from "src/app/services/organization.service";
import { OrganizationUpdateComponent } from "./organization-update/organization-update.component";
import { OrganizationAddComponent } from "./organization-add/organization-add.component";
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { first } from "rxjs/operators";
import { WebConstants } from "src/app/util/web.constants";
import { ToastrService } from "ngx-toastr";
import { TokenStorage } from "src/app/util/token.storage";
import { Router } from "@angular/router";

@Component({
  selector: "app-organization",
  templateUrl: "./organization.component.html",
  styleUrls: ["./organization.component.scss"],
})
export class OrganizationComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public displayedColumns: string[] = [
    "name",
    "emailAddress",
    "phoneNumber1",
    "address",
    "city",
    "state",
    "country",
    "status",
    "actions",
  ];

  //   {
  //     "name": "Conure Telecom",
  //     "address": "US",
  //     "phoneNumber1": "12345",
  //     "phoneNumber2": "12345",
  //     "emailAddress": "conurets@cts.com",
  //     "postalCode":"12345",
  //     "city": "Atlanta 123",
  //     "state": "Florida",
  //     "country": "US",
  //     "status": 1
  // }

  public tempId: any;
  public dataSource = new MatTableDataSource();
  organizations: any = [];
  public isUserNotSuperAdmin = true;

  ngOnInit(): void {}

  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    public tokenStorage: TokenStorage,
    public organizationService: OrganizationService,
    public toastrService: ToastrService,
    private router: Router
  ) {
    if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
      this.isUserNotSuperAdmin = true;
      this.getOrganizationById();
    } else {
      this.isUserNotSuperAdmin = false;
      this.getAllOrganization();
    }
  }

  // getAllOrganization() {
  //   this.organizationService.getAll()
  //     .pipe(first())
  //     .subscribe(response => {
  //       if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
  //         this.organizations = response.data;
  //         this.dataSource = new MatTableDataSource<unknown>(this.organizations);
  //         this.dataSource.paginator = this.paginator;
  //         this.dataSource.sort = this.sort;
  //         console.log("response ",response.data);
  //       } else {
  //         this.toastrService.error(response.value,"Failed To Load Data!")
  //       }
  //     });
  // }

  ///////////////////
  getAllOrganization() {
    this.organizationService
      .getAll()
      .pipe(first())
      .subscribe((response) => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.organizations = response.data;
          this.organizations = this.organizations.map((org) => {
            if (org.status != null) {
              if (org.status == 1) {
                org.status = "Active";
              } else {
                org.status = "Inactive";
              }
            } else {
              org.status = "Inactive";
            }

            return org;
          });
          this.dataSource = new MatTableDataSource<unknown>(this.organizations);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log("response ", response.data);
        } else {
          this.toastrService.error(response.value, "Failed To Load Data!");
        }
      });
  }

  getTempId(obj: any) {
    this.tempId = obj;
  }

  //////////////////////

  getOrganizationById() {
    this.organizationService
      .getOrganizationById(this.tokenStorage.getOrganizationId())
      .pipe(first())
      .subscribe((response) => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          let organization = response.data;

          // if(this.organizations.status != null){

          // if(this.organizations.status == 1){
          //   this.organizations.active = "Active";
          //   this.organizations = [response.data];
          //   this.dataSource = new MatTableDataSource<unknown>(this.organizations);
          // }else if (this.organizations.status == 2){
          //   this.organizations.active ="Inactive"
          // }

          // }else{
          // this.organizations.active ="Inactive"
          // }
          this.organizations = [response.data];
          this.dataSource = new MatTableDataSource<unknown>(this.organizations);

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log("response ", response.data);
        } else {
          this.toastrService.error(response.value, "Failed To Load Data!");
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addOrganizationDialog() {
    const dialogRef = this.dialog.open(OrganizationAddComponent, {
      data: null,
    });

    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
        this.getOrganizationById();
      } else {
        this.getAllOrganization();
      }
    });
  }

  updateOrganizationDialog(data) {
    console.log(data);
    const dialogRef = this.dialog.open(OrganizationUpdateComponent, {
      data: data,
    });

    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
        this.getOrganizationById();
      } else {
        this.getAllOrganization();
      }
    });
  }

  deleteOrganization(organization) {
    this.organizationService
      .deleteOrganization(organization.id)
      .pipe(first())
      .subscribe((response) => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(
            response.value,
            "Organization Deleted Successfully!"
          );

          if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
            this.getOrganizationById();
          } else {
            this.getAllOrganization();
          }
        } else {
          this.toastrService.error(response.value, "Failed To Delete Data!");
        }
      });
  }
}
