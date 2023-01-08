import { Component, OnInit, ViewChild } from "@angular/core";

import { BinTypeService } from "src/app/services/bin.type.service";

import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource,
} from "@angular/material";
import { first } from "rxjs/operators";
import { BinSpotColorService } from "src/app/services/bin.spot.color.service";
import { TokenStorage } from "src/app/util/token.storage";
import { WebConstants } from "src/app/util/web.constants";

import { ToastrService } from "ngx-toastr";

import { Router } from "@angular/router";
import { BinTypeAddComponent } from "./bin-type-add/bin-type-add.component";
import { BinTypeUpdateComponent } from "./bin-type-update/bin-type-update.component";

@Component({
  selector: "app-bin-type",
  templateUrl: "./bin-type.component.html",
  styleUrls: ["./bin-type.component.scss"],
})
export class BinTypeComponent implements OnInit {
  public displayedColumns: string[] = [
    "organizationName",
    "binType",
    "binTypeDescription",
    "binTypeHeight",
    "status",
    "actions",
  ];

  // private Long id;
  // private Long organizationId;
  // private String binType;
  // private String binTypeDescription;
  // private Integer binTypeHeight;

  public dataSource = new MatTableDataSource();
  public binType: any[] = [];
  public tempId: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public binTypeService: BinTypeService,
    public tokenStorage: TokenStorage,
    public toastrService: ToastrService,
    public dialog: MatDialog,
    private router: Router
  ) {
    if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
      this.getAllByOrganization(this.tokenStorage.getOrganizationId());
    } else {
      this.getAll();
    }
  }

  ngOnInit(): void {}

  getAll() {
    this.binTypeService
      .getAll()
      .pipe(first())
      .subscribe((response) => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.binType = response.data;

          this.binType = this.binType.map((spot) => {
            if (spot.status && spot.status === 1) {
              spot.status = "Active";
            } else {
              spot.status = "Inactive";
            }

            return spot;
          });

          this.dataSource = new MatTableDataSource<unknown>(this.binType);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log("response of bin spot color ", response.data);
        } else {
          this.toastrService.error(response.value, "Failed To Load Data!");
        }
      });
  }

  getAllByOrganization(organizationId: any): void {
    this.binTypeService
      .getAllByOrganization(this.tokenStorage.getOrganizationId())
      .pipe(first())
      .subscribe((response) => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.binType = response.data;

          this.binType = this.binType.map((spot) => {
            if (spot.status && spot.status === 1) {
              spot.status = "Active";
            } else {
              spot.status = "Inactive";
            }

            return spot;
          });

          this.dataSource = new MatTableDataSource<unknown>(this.binType);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
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

  addBinTypeDialog(): void {
    const dialogRef = this.dialog.open(BinTypeAddComponent, {
      data: null,
      width: "550px",
    });

    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
        this.getAllByOrganization(this.tokenStorage.getOrganizationId());
      } else {
        this.getAll();
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

  deleteParkingSpot(Binspot) {
    this.binTypeService
      .delete(Binspot.id)
      .pipe(first())
      .subscribe((response) => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(
            response.value,
            "Bin Type Delete Successfully!"
          );

          if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
            this.getAllByOrganization(this.tokenStorage.getOrganizationId());
          } else {
            this.getAll();
          }
        } else {
          this.toastrService.error(response.value, "Failed To Delete Data!");
        }
      });
  }

  updateBinTypeDialog(data) {
    console.log("update data obj : {}", data);
    const dialogRef = this.dialog.open(BinTypeUpdateComponent, {
      width: "550px",
      data: data,
    });

    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
        this.getAllByOrganization(this.tokenStorage.getOrganizationId());
      } else {
        this.getAll();
      }
    });
  }
}
