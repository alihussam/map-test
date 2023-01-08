import { TokenStorage } from './../../../../util/token.storage';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { WebConstants } from 'src/app/util/web.constants';
import { WebUtil, getStatusCode } from 'src/app/util/web.util';
import { PreferenceService } from 'src/app/services/preference.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-preference',
  templateUrl: './add-preference.component.html',
  styleUrls: ['./add-preference.component.scss']
})
export class AddPreferenceComponent implements OnInit {

  public form: any;

  constructor(public dialogRef: MatDialogRef<AddPreferenceComponent>,
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
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  addPreferences(): void {
    let data = this.form.value;
    data.status = getStatusCode(data.status);

    this.preferenceService.addPreferences(data)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toaster.success("Preferences has been added", "Success");

          this.closeDialog();
        } else {
          this.toaster.success(response.value, "Error");
        }
      });
  }
}
