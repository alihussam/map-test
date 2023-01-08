import { NgModule } from '@angular/core';
import { CommonConfigModule } from 'src/app/shared-modules/commonConfig.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserAddDialogComponent } from './user-add-dialog/user-add-dialog.component';
import { UserAssignDealerDialogComponent } from './user-assign-dealer-dialog/user-assign-dealer-dialog.component';
import { UserAssignPrivilegesDialogComponent } from './user-assign-privileges-dialog/user-assign-privileges-dialog.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserRoutingModule } from './user-routing.module';
import { UserUpdateDialogComponent } from './user-update-dialog/user-update-dialog.component';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [
    UserComponent,
    UserUpdateDialogComponent,
    UserAddDialogComponent,
    UserAssignPrivilegesDialogComponent,
    UserAssignDealerDialogComponent,
    ChangePasswordComponent,
    UserProfileComponent,
  ],
  imports: [  
    UserRoutingModule,

    CommonConfigModule
  ],
})
export class UserModule { }
