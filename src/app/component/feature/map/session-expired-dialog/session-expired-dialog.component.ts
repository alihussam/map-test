import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { MapService } from 'src/app/services/map.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-session-expired-dialog',
  templateUrl: './session-expired-dialog.component.html',
  styleUrls: ['./session-expired-dialog.component.scss']
})
export class SessionExpiredDialogComponent implements OnInit {
  public sessionExpired: any = null;
  public seletedValue: string = "";
  public isTicketGivenPropertyVisible: boolean = false;
  public isVehicleLeftPropertyVisible: boolean = false;
  public isWarningGivenPropertyVisible: boolean = false;
  public form: any;
  //public sessionExpiredTimeList: any[] = [2, 4, 6];

  //{"id":1710,"lat":27.688845,"lng":-82.736872,"spotname":"A901","occupancyduration":"0 days 0 hr 46 min","deviceid":"0004A30B00261602","sensorname":"A901"}

  constructor(public dialog: MatDialogRef<SessionExpiredDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public mapService: MapService,
    public toastrService: ToastrService) {
    this.init(data);
  }

  ngOnInit(): void {
    this.seletedValue = "Extended session expired";
  }

  init(data: any): void {
    this.sessionExpired = data;

    console.log("init.sessionExpired={}", this.sessionExpired);

    this.form = new FormGroup({
      ticketNumber: new FormControl("")
    });

    if (this.sessionExpired.actionType !== null) {
      //this.isSavedButtonDisabled = true;
      //this.onChangedTicketGiven(true);
      this.form.get('ticketNumber').setValue(this.sessionExpired.actionValue);
    }
  }

  saveAction(): void {
    let data = this.form.getRawValue();

    //console.log("saveAction.data={}", data);

    let sessionExpiredActionObject = {
      sessionId: this.sessionExpired.sessionId,
      documentId: this.sessionExpired.documentId,
      spotId: this.sessionExpired.spotId,
      deviceId: this.sessionExpired.deviceid,
      actionType: "",
      actionValue: "",
      spotClear: this.sessionExpired.spotClear
    };

    if (this.isTicketGivenPropertyVisible) {
      sessionExpiredActionObject.actionType = "TICKET";
      sessionExpiredActionObject.actionValue = data.ticketNumber;
    } else if (this.isVehicleLeftPropertyVisible) {
      sessionExpiredActionObject.actionType = "VEHICLE_LEFT";
      sessionExpiredActionObject.actionValue = "true";
    } else if (this.isWarningGivenPropertyVisible) {
      sessionExpiredActionObject.actionType = "WARNING_GIVEN";
      sessionExpiredActionObject.actionValue = "true";
    }

    //console.log("saveAction.jsonObject={}", jsonObject);

    if (sessionExpiredActionObject.actionType === "" || sessionExpiredActionObject.actionType === null) {
      this.toastrService.error("error", "Please select any option");
    } else if (sessionExpiredActionObject.actionValue === "" || sessionExpiredActionObject.actionValue === null) {
      this.toastrService.error("error", "Please enter ticket number");
    } else {
      if (this.sessionExpired.actionType === "" || this.sessionExpired.actionType === null) {
        this.mapService.saveSessionExpiredAction(sessionExpiredActionObject)
        .pipe(first())
        .subscribe(response => {
          if (response && response.code === 0) {
            this.toastrService.success(response.value, "Action has been taken successfully");
  
            this.closeDialog();
          } else {
            this.toastrService.error(response.value, "Action failed")
          }
        });
      } else {
        //this.toastrService.error("error", "Ticket already issued.");

        this.mapService.saveSessionExpiredAction(sessionExpiredActionObject)
        .pipe(first())
        .subscribe(response => {
          if (response && response.code === 0) {
            this.toastrService.success(response.value, "Action has been updated successfully");
  
            this.closeDialog();
          } else {
            this.toastrService.error(response.value, "Action failed")
          }
        });
      }
    }
  }

  onChangedTicketGiven(isChecked: boolean): void {
    this.isTicketGivenPropertyVisible = isChecked;
  }

  onChangedVehicleLeft(isChecked: boolean): void {
    this.isVehicleLeftPropertyVisible = isChecked;
  }

  onChangedWarningGiven(isChecked: boolean): void {
    this.isWarningGivenPropertyVisible = isChecked;
  }

  closeDialog(): void {
    this.dialog.close();
  }
}
