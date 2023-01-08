import { Component, OnInit, ViewChild } from "@angular/core";
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
import { BinSpotColorAddComponent } from "./bin-spot-color-add/bin-spot-color-add.component";
import { ToastrService } from "ngx-toastr";
import { BinSpotColorUpdateComponent } from "./bin-spot-color-update/bin-spot-color-update.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-bin-spot-color",
  templateUrl: "./bin-spot-color.component.html",
  styleUrls: ["./bin-spot-color.component.scss"],
})
export class BinSpotColorComponent implements OnInit {
  public displayedColumns: string[] = [
    "organizationName",
    "platformName",
    "fullColor",
    "fullText",
    "partialFullColor",
    "partialFullText",
    "emptyColor",
    "emptyText",
    "fireColor",
    "fireText",
    "fallenColor",
    "fallenText",
    "status",
    "actions",
  ];

  public dataSource = new MatTableDataSource();
  public binSpotColorList: any[] = [];
  public tempId: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public binSpotColorService: BinSpotColorService,
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

  ngOnInit(): void {
    // this.getAllByOrganization(this.tokenStorage.getOrganizationId());
    // this.getAll();
  }

  getAll() {
    this.binSpotColorService
      .getAll()
      .pipe(first())
      .subscribe((response) => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.binSpotColorList = response.data;

          this.binSpotColorList = this.binSpotColorList.map((spot) => {
            if (spot.status && spot.status === 1) {
              spot.status = "Active";
            } else {
              spot.status = "Inactive";
            }

            return spot;
          });

          this.dataSource = new MatTableDataSource<unknown>(
            this.binSpotColorList
          );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log("response of bin spot color ", response.data);
        } else {
          this.toastrService.error(response.value, "Failed To Load Data!");
        }
      });
  }

  getAllByOrganization(organizationId: any): void {
    this.binSpotColorService
      .getAllByOrganization(this.tokenStorage.getOrganizationId())
      .pipe(first())
      .subscribe((response) => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.binSpotColorList = response.data;

          this.binSpotColorList = this.binSpotColorList.map((spot) => {
            console.log("Here");
            if (spot.status && spot.status === 1) {
              spot.status = "Active";
            } else {
              spot.status = "Inactive";
            }

            return spot;
          });

          this.dataSource = new MatTableDataSource<unknown>(
            this.binSpotColorList
          );
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

  addBinSpotColorDialog(): void {
    const dialogRef = this.dialog.open(BinSpotColorAddComponent, {
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
    this.binSpotColorService
      .delete(Binspot.binSpotColorId)
      .pipe(first())
      .subscribe((response) => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(
            response.value,
            "Color Spot Delete Successfully!"
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

  updateBinSpotColorDialog(data) {
    console.log("update data obj : {}", data);
    const dialogRef = this.dialog.open(BinSpotColorUpdateComponent, {
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
