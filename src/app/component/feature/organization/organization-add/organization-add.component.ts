import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrganizationService } from 'src/app/services/organization.service';
import { first } from 'rxjs/operators';
import { WebConstants } from 'src/app/util/web.constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-organization-add',
  templateUrl: './organization-add.component.html',
  styleUrls: ['./organization-add.component.scss']
})
export class OrganizationAddComponent implements OnInit {

  public form: any;

  constructor(
    public dialogRef: MatDialogRef<OrganizationAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public organizationService: OrganizationService,
    public toastrService: ToastrService,
  ) {
  }
  ngOnInit() { 
    this.initlizeUserAddForm();
  }

  initlizeUserAddForm() {
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
      

      //phoneNumber2: new FormControl(""),      
     // postalCode: new FormControl("", Validators.required),
      


  //    {
  //     "name": "Conure Telecom",
  //     "address": "US",
  //     "phoneNumber1": "12345",    
  //     "phoneNumber2": "12345",
  //     "emailAddress": "conurets@cts.com",
  //     "postalCode":"12345",
  //     "city": "Atlanta 123",
  //     "state": "Florida",
  //     "country": "US",
  //     "status": 1
  // }


         
     
    });

  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  addOrganizationData($event: MouseEvent) {
    ($event.target as HTMLButtonElement).disabled = true;
    console.log("add Organization data ",this.form.getRawValue() );
    let data = this.form.getRawValue()
    this.organizationService.addOrganization(data)
      .pipe(first())
      .subscribe(response => {
        if(response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value,"Data Add Successfully!");
          this.dialogRef.close();
        } else {
          this.toastrService.error(response.value,"Failed To Add Data!")
        }
      });
  }


}
