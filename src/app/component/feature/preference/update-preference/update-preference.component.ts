import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TokenStorage } from 'src/app/util/token.storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { WebConstants } from 'src/app/util/web.constants';
import { WebUtil, getStatusMessage, getStatusCode } from 'src/app/util/web.util';
import { ToastrService } from 'ngx-toastr';
import { PreferenceService } from 'src/app/services/preference.service';

@Component({
  selector: 'app-update-preference',
  templateUrl: './update-preference.component.html',
  styleUrls: ['./update-preference.component.scss']
})
export class UpdatePreferenceComponent implements OnInit {

  public form: any;

  constructor(public dialogRef: MatDialogRef<UpdatePreferenceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public preferenceService: PreferenceService,
    public token: TokenStorage,
    public webUtil: WebUtil,
    public toaster: ToastrService) {
  }

  ngOnInit() {
    this.init();
  }

  init(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      status: new FormControl('')
    });

    //console.log("this.data.status={}", this.data.status);

    this.form.get("name").setValue(this.data.name);
    this.form.get("value").setValue(this.data.value);
    this.form.get("description").setValue(this.data.description);
    this.form.get("status").setValue(getStatusMessage(this.data.status));
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  updatePreference(): void {
    let data = this.form.value;
    data.id = this.data.id;
    data.status = getStatusCode(data.status);

    this.preferenceService.updatePreference(data)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toaster.success("Preference has been updated", "Success");

          this.closeDialog();
        } else {
          this.toaster.success(response.value);
        }
      });
  }
}
