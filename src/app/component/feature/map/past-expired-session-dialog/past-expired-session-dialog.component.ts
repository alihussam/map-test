import { WebUtil  ,timeConvertByMinutes} from './../../../../util/web.util';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MapService } from 'src/app/services/map.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { WebConstants } from 'src/app/util/web.constants';

@Component({
  selector: 'app-past-expired-session-dialog',
  templateUrl: './past-expired-session-dialog.component.html',
  styleUrls: ['./past-expired-session-dialog.component.scss']
})
export class PastExpiredSessionDialogComponent implements OnInit {
  public sessionExpired: any = null;
  public seletedValue: string = "";
  public isTicketGivenPropertyVisible: boolean = false;
  public isVehicleLeftPropertyVisible: boolean = false;
  public isWarningGivenPropertyVisible: boolean = false;
  public isPermitPropertyVisible: boolean = false;
  public form: any;
  
  constructor(public dialog: MatDialogRef<PastExpiredSessionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public mapService: MapService,
    public toastrService: ToastrService, 
    ) {
    this.init(data);
  }

  ngOnInit(): void {
    this.seletedValue = "Extended session expired";
  }

  init(data: any): void {
    data.duration = timeConvertByMinutes(data.duration);
    data.trashLoadTime = timeConvertByMinutes(data.trashLoadTime);
    this.sessionExpired = data;
    

    console.log("init.sessionExpired={}", this.sessionExpired);

    this.form = new FormGroup({
      ticketNumber: new FormControl("")
    });

    if (this.sessionExpired.actionType !== null) {
      if (this.sessionExpired.actionType === WebConstants.ACTION_TAKEN.TICKET) {
        this.onChangedTicketGiven(true);
        
        this.form.get('ticketNumber').setValue(this.sessionExpired.actionValue);
      } else if (this.sessionExpired.actionType === WebConstants.ACTION_TAKEN.VEHICLE_LEFT) {
        this.onChangedVehicleLeft(true);
      } else if (this.sessionExpired.actionType === WebConstants.ACTION_TAKEN.WARNING_GIVEN) {
        this.onChangedWarningGiven(true);
      } else if (this.sessionExpired.actionType === WebConstants.ACTION_TAKEN.PERMIT) {
        this.onChangedPermit(true);
      }
    }
  }

  saveAction(): void {
    let data = this.form.getRawValue();

    //console.log("saveAction.data={}", data);

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

    //console.log("saveAction.jsonObject={}", jsonObject);

    if (sessionExpiredActionObject.actionType === "" || sessionExpiredActionObject.actionType === null) {
      this.toastrService.error("error", "Please select any option");
    } else if (sessionExpiredActionObject.actionValue === "" || sessionExpiredActionObject.actionValue === null) {
      this.toastrService.error("error", "Please enter ticket number");
    } else {
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
}
