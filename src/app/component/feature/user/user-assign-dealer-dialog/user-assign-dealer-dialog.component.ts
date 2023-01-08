import { Component, OnInit, Inject } from '@angular/core';
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

@Component({
  selector: 'app-user-assign-dealer-dialog',
  templateUrl: './user-assign-dealer-dialog.component.html',
  styleUrls: ['./user-assign-dealer-dialog.component.scss']
})
export class UserAssignDealerDialogComponent implements OnInit {

  public displayedColumns: string[] = ["name", "actions"];
  public dataSource = new MatTableDataSource();
  public allDealers: any[] = [];
  public toggle = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<UserAssignDealerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService
  ) {
    this.allDealers.push({name:"test",check:true,disable:false});
    this.dataSource = new MatTableDataSource<unknown>(this.allDealers);

    this.getAllDealers();
    this.getUserDealers(this.data);
  }

  ngOnInit() {}

  getAllDealers() {
    
  }

  getUserDealers(data) {
  }

  onChange(data) {
    let userId = this.data;
    let dealerId = data.id;
    if (this.toggle.value == true) {
      this.addDealers(userId , dealerId);
    } else {
      this.deleteDealers(userId , dealerId);
    }
  }

  addDealers(userId , dealerId) {
    console.log("add Dealer clicked");
  }

  deleteDealers(userId , dealerId) {
    console.log("delete Dealer clicked");  
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
