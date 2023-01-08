import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthenticationGuard } from 'src/app/helper/authentication.guard';



const routes: Routes = [
  { path: '', component: UserComponent ,canActivate:[AuthenticationGuard]},
 // { path: 'change-password', component:   ChangePasswordComponent ,canActivate:[AuthenticationGuard]},
 // { path: 'user-profile', component:   UserProfileComponent ,canActivate:[AuthenticationGuard]},
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
