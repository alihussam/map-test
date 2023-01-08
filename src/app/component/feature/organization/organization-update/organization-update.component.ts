import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OrganizationService } from 'src/app/services/organization.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { WebConstants } from 'src/app/util/web.constants';
import { ToastrService } from 'ngx-toastr';
import { TokenStorage } from 'src/app/util/token.storage';
import { getStatusCode, getStatusList, getStatusMessage, WebUtil } from 'src/app/util/web.util';

@Component({
  selector: 'app-organization-update',
  templateUrl: './organization-update.component.html',
  styleUrls: ['./organization-update.component.scss']
})
export class OrganizationUpdateComponent implements OnInit {

  public form: any;

  public statusList: any = [];

  constructor(public dialogRef: MatDialogRef<OrganizationUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public tokenStorage: TokenStorage,
    public organizationService: OrganizationService,
    public toastrService:ToastrService,
    public webUtil: WebUtil) {
    this.initlizeUserAddForm();
  }

  initlizeUserAddForm() {
    this.statusList = getStatusList();

    this.form = new FormGroup({
      name: new FormControl("",Validators.required),
      emailAddress: new FormControl("", Validators.compose([Validators.email,Validators.required])),
      phoneNumber1: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      latitude: new FormControl("", Validators.required),
      longitude: new FormControl("", Validators.required),
      
     // phoneNumber2: new FormControl(""),
      
     // postalCode: new FormControl("", Validators.required),     
      city: new FormControl("", Validators.required),
      state: new FormControl("", Validators.required),
      country: new FormControl("", Validators.required),
      status: new FormControl("", Validators.required),
       // phoneNumber2: new FormControl(""),
      // postalCode: new FormControl("", Validators.required),




    //   {
    //     "id" : 7,
    //     "name": "Conure TS",
    //     "address": "US",
    //     "phoneNumber1": "123",    
    //     "phoneNumber2": "123",
    //     "emailAddress": "conureits@cits.com",
    //     "postalCode":"123",
    //     "city": "Atlanta",
    //     "state": "Florida",
    //     "country": "US",
    //     "status": 1
    // }


    });

    this.form.get('name').setValue(this.data.name);
    this.form.get('emailAddress').setValue(this.data.emailAddress);
    this.form.get('phoneNumber1').setValue(this.data.phoneNumber1);
    this.form.get('address').setValue(this.data.address);
    this.form.get('latitude').setValue(this.data.latitude);
    this.form.get('longitude').setValue(this.data.longitude);
    this.form.get('city').setValue(this.data.city);
    this.form.get('state').setValue(this.data.state);
    this.form.get('country').setValue(this.data.country);
    this.form.get('status').setValue(getStatusMessage(this.data.status));

    
   
    console.log("update status ", this.data.status)
   //  this.form.get('phoneNumber2').setValue(this.data.phoneNumber2);
    
    // this.form.get('postalCode').setValue(this.data.postalCode);
   

    if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
      this.form.get('name').disable();
    } 
  }

  ngOnInit() { }

  closeDialog(): void {
    this.dialogRef.close();
  }

  updateOrganizationData() {
    console.log("update Organization Data ",this.form.getRawValue());
    let updatedData = this.form.getRawValue();
    updatedData.id = this.data.id;
    this.organizationService.updateOrganization(updatedData)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value,"Data Updated Successfully!");
          this.dialogRef.close();
        } else {
          this.toastrService.error(response.value,"Failed To Update Data!");
        }
      });
  }
}
