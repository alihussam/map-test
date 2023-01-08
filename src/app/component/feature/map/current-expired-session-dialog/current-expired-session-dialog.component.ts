import {convertMillimeterToInches, timeConvertByMinutes} from 'src/app/util/web.util';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MapService } from 'src/app/services/map.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { WebConstants } from 'src/app/util/web.constants';

@Component({
  selector: 'app-current-expired-session-dialog',
  templateUrl: './current-expired-session-dialog.component.html',
  styleUrls: ['./current-expired-session-dialog.component.scss']
})
export class CurrentExpiredSessionDialogComponent implements OnInit {
  public sessionExpired: any = null;
  public seletedValue: string = "";
  public isTicketGivenPropertyVisible: boolean = false;
  public isVehicleLeftPropertyVisible: boolean = false;
  public isWarningGivenPropertyVisible: boolean = false;
  public isPermitPropertyVisible: boolean = false;
  public form: any;
  public allStatusFilters: any = [
    { name : 'ALL', value : 'ALL' },
    { name : 'FULL', value: 'FULL'},
    { name : 'EMPTY', value : 'EMPTY'},
    { name : 'PARTIAL', value : 'HALF_FULL'}
  ];

  constructor(public dialog: MatDialogRef<CurrentExpiredSessionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public mapService: MapService,
    public toastrService: ToastrService) {
    this.init(data);
  }

  ngOnInit(): void {
    this.seletedValue = "Extended session expired";
  }

  init(data: any): void {

    console.log(data.elaspTime);

    //data.elaspTime = timeConvertByMinutes(data.elaspTime);
    data.elaspTime = data.elaspTime;
    data.trashLoadTime = timeConvertByMinutes(data.trashLoadTime);
    data.height = convertMillimeterToInches(data.height);
    this.sessionExpired = data;
    this.form = new FormGroup({
      ticketNumber: new FormControl("")
    });

    if (this.sessionExpired.actionType !== null) {
      this.form.get('ticketNumber').setValue(this.sessionExpired.actionValue);
    }
  }

  saveAction(): void {
    let data = this.form.getRawValue();

    //console.log("sessionExpired={}", this.sessionExpired);

    let sessionExpiredActionObject = {
      sessionId: this.sessionExpired.sessionId,
      documentId: this.sessionExpired.documentId,
      actionType: "",
      actionValue: "",
    };

    if (this.isTicketGivenPropertyVisible) {
      sessionExpiredActionObject.actionType = WebConstants.ACTION_TAKEN.TICKET;
      sessionExpiredActionObject.actionValue = data.ticketNumber;
    } else if (this.isVehicleLeftPropertyVisible) {
      sessionExpiredActionObject.actionType = WebConstants.ACTION_TAKEN.VEHICLE_LEFT;
      sessionExpiredActionObject.actionValue = "true";
    } else if (this.isWarningGivenPropertyVisible) {
      sessionExpiredActionObject.actionType = WebConstants.ACTION_TAKEN.WARNING_GIVEN;
      sessionExpiredActionObject.actionValue = "true";
    } else if (this.isPermitPropertyVisible) {
      sessionExpiredActionObject.actionType = WebConstants.ACTION_TAKEN.PERMIT;
      sessionExpiredActionObject.actionValue = "true";
    }

    //console.log("saveAction.jsonObject={}", sessionExpiredActionObject);

    if (sessionExpiredActionObject.actionType === "" || sessionExpiredActionObject.actionType === null) {
      this.toastrService.error("error", "Please select any option");
    } else if (sessionExpiredActionObject.actionValue === "" || sessionExpiredActionObject.actionValue === null) {
      this.toastrService.error("error", "Please enter ticket number");
    } else {
      /* if (this.sessionExpired.actionType === "" || this.sessionExpired.actionType === null) {
        
      } else {
        this.toastrService.error("error", "Ticket already issued.");
      } */

      this.mapService.saveSessionExpiredAction(sessionExpiredActionObject)
        .pipe(first())
        .subscribe(response => {
          if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
            this.toastrService.success(response.value, "Action has been taken successfully");

            this.closeDialog();
          } else {
            this.toastrService.error(response.value, "Action failed")
          }
        });
    }
  }

  onChangedTicketGiven(isChecked: boolean): void {
    this.isTicketGivenPropertyVisible = isChecked;

    this.isVehicleLeftPropertyVisible = false;
    this.isWarningGivenPropertyVisible = false;
    this.isPermitPropertyVisible = false;
  }

  onChangedVehicleLeft(isChecked: boolean): void {
    this.isVehicleLeftPropertyVisible = isChecked;

    this.isTicketGivenPropertyVisible = false;
    this.isWarningGivenPropertyVisible = false;
    this.isPermitPropertyVisible = false;
  }

  onChangedWarningGiven(isChecked: boolean): void {
    this.isWarningGivenPropertyVisible = isChecked;

    this.isTicketGivenPropertyVisible = false;
    this.isVehicleLeftPropertyVisible = false;
    this.isPermitPropertyVisible = false;
  }

  onChangedPermit(isChecked: boolean): void {
    this.isPermitPropertyVisible = isChecked;

    this.isTicketGivenPropertyVisible = false;
    this.isVehicleLeftPropertyVisible = false;
    this.isWarningGivenPropertyVisible = false;
  }

  closeDialog(): void {
    this.dialog.close();
  }

  getStatusValue(status: string): any {
    let result = 'No Event';
    this.allStatusFilters.forEach(statusFilter => {
      if (statusFilter.value === status) {
        result = statusFilter.name;
      }
    });
    return result;
  }


  convertMinutesToString(elaspTime: any): any {
    return  elaspTime != null && elaspTime !== '' ? timeConvertByMinutes (elaspTime) : '--';
  }
}
