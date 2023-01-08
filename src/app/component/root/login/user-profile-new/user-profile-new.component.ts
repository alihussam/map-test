import { Component, OnInit } from '@angular/core';
import { TokenStorage } from '../../../../util/token.storage';
import { UserService } from '../../../../services/user.service';
import { OrganizationService } from '../../../../services/organization.service';
import { first } from 'rxjs/operators';
import { WebConstants } from 'src/app/util/web.constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile-new',
  templateUrl: './user-profile-new.component.html',
  styleUrls: ['./user-profile-new.component.scss']
})
export class UserProfileNewComponent implements OnInit {

  public user:any = {};

  constructor(
    public tokenStorage: TokenStorage,
    public userService: UserService,
    public organizationService: OrganizationService,
    public toastrService: ToastrService,
    ){ 
      this.getUserById();
    }

  ngOnInit(): void {
  }

  getUserById(){
    this.userService.getUserById(this.tokenStorage.getUserId())
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.user = response.data;
          console.log("response ",response.data);
        } else {
          this.toastrService.error(response.value,"Failed To Load Data!")
        }
      });
  }
}
