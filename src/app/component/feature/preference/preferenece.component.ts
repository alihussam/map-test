import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { PreferenceService } from 'src/app/services/preference.service';
import { first } from 'rxjs/operators';
import { WebConstants } from 'src/app/util/web.constants';
import { AddPreferenceComponent } from './add-preference/add-preference.component';
import { UpdatePreferenceComponent } from './update-preference/update-preference.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-preferenece',
  templateUrl: './preferenece.component.html',
  styleUrls: ['./preferenece.component.scss']
})
export class PrefereneceComponent implements OnInit {
  public displayedColumns: string[] = [
    "name",
    "value",
    "description",
    "status",
    "actions"
  ];

  public preferenceList: any[] = [];

  public dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public preferenceService: PreferenceService,
    public dialog: MatDialog,
    public toaster: ToastrService) {
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.getAllPreferences();
  }

  getAllPreferences(): void {
    this.preferenceService.getAllPreferences()
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.preferenceList = response.data;
          this.dataSource = new MatTableDataSource(this.preferenceList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          alert(response.value);
          this.toaster.success(response.value, 'Error');
        }
      });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addPreferenceDialog(): void {
    const dialogRef = this.dialog.open(AddPreferenceComponent, {
      width: '500px',
      autoFocus: false,
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.toaster.success('Action Completed', 'Sucess');

      this.getAllPreferences();
    });
  }

  updatePreferenceDialog(data: any): void {
    const dialogRef = this.dialog.open(UpdatePreferenceComponent, {
      width: "500px",
      autoFocus: false,
      maxHeight: "90vh",
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.toaster.success('Action Completed', 'Sucess');

      this.getAllPreferences();
    });
  }
}
