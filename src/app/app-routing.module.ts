import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChangePasswordComponent } from "./component/feature/user/change-password/change-password.component";
import { AccessDeniedComponent } from "./component/root/login/access-denied/access-denied.component";
import { AddNewPasswordComponent } from "./component/root/login/add-new-password/add-new-password.component";
import { ChangePasswordNewComponent } from "./component/root/login/change-password-new/change-password-new.component";
import { ForgetUsernameComponent } from './component/root/login/forget-username/forget-username.component';
import { ForgotPasswordComponent } from "./component/root/login/forgot-password/forgot-password.component";
import { LoginNewComponent } from "./component/root/login/login-new/login-new.component";
import { UserProfileNewComponent } from "./component/root/login/user-profile-new/user-profile-new.component";
import { CustomPreloadingService } from "./custom-preloading/custom-preloading.service";
import { AuthenticationGuard } from "./helper/authentication.guard";

const routes: Routes = [
  { path: "", component: LoginNewComponent, pathMatch: "full" },
  { path: "login", component: LoginNewComponent },
  { path: "add-new-password", component: AddNewPasswordComponent },
  { path: "forget-password", component: ForgotPasswordComponent },
  { path: "forget-username", component: ForgetUsernameComponent },
  { path: "access-denied", component: AccessDeniedComponent },
  { path: "change-password",canActivate: [AuthenticationGuard], component: ChangePasswordNewComponent },
  { path: "user-profile",canActivate: [AuthenticationGuard], component: UserProfileNewComponent },

  // {
  //   path: "user", data: { preload: false }, loadChildren: () =>
  //     import("./component/feature/user/user.module").then((m) => m.UserModule),
  // },
  
  {
    path: "map", data: { preload: true }, loadChildren: () =>
      import("./component/feature/map/map.module").then(
        (m) => m.MapModule),
  },

  {
    path: "organization",   canActivate: [AuthenticationGuard],
    data: {
      role:'ROLE_SUPER_ADMIN'
    }, loadChildren: () =>
      import("./component/feature/organization/organization.module").then(
        (m) => m.OrganizationModule),
  },

  {
    path: "user",canActivate: [AuthenticationGuard],
     data: { role:['ROLE_SUPER_ADMIN','ROLE_ADMIN'] }, loadChildren: () =>
      import("./component/feature/user/user.module").then((m) => m.UserModule),
  },

  {
    path: "bin-spot",canActivate: [AuthenticationGuard], 
    data: { role:['ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_MANAGER'] },
     loadChildren: () =>import("./component/feature/bin-spot/bin-spot.module").then(
        (m) => m.BinSpotModule),
  },


  { path: 'bin-spot-color',canActivate: [AuthenticationGuard],
   data: { role:['ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_MANAGER'] },
    loadChildren: () => import('./component/feature/bin-spot-color/bin-spot-color.module').then
    (m => m.BinSpotColorModule)
   },

   {
    path: "bi-report",canActivate: [AuthenticationGuard],
    data: { role:['ROLE_SUPER_ADMIN','ROLE_ADMIN'] },
    loadChildren: () =>
      import("./component/feature/report/avg-time-to-full/avg-time-to-full.module").then(
        (m) => m.AvgTimeToFullModule
      ),
  },
 

  { 
    path: 'bin-type',canActivate: [AuthenticationGuard],
  data: { role:['ROLE_SUPER_ADMIN','ROLE_ADMIN'] },
   loadChildren: () => import('./component/feature/bin-type/bin-type.module').then
   (m => m.BinTypeModule)
   },

   { path: 'dashboard',canActivate: [AuthenticationGuard],
   data: { role:'ROLE_ADMIN' },
    loadChildren: () => import('./component/feature/dashboard/dashboard.module').then
    (m => m.DashboardModule) },
 
  


// {
  //   path: "organization", data: { preload: true }, loadChildren: () =>
  //     import("./component/feature/organization/organization.module").then(
  //       (m) => m.OrganizationModule),
  // },


  
  // {
  //   path: "device-alert", data: { preload: false }, loadChildren: () =>
  //     import("./component/feature/device-alert/device-alert.module").then(
  //       (m) => m.DeviceAlertModule),
  // },
  // {
  //   path: "geofence", data: { preload: false }, loadChildren: () =>
  //     import("./component/feature/geofence/geofence.module").then(
  //       (m) => m.GeofenceModule), 
  // },
 
 
  {
    path: "preference", data: { preload: true }, loadChildren: () =>
      import("./component/feature/preference/preference.module").then(
        (m) => m.PreferenceModule),
  },
 // { path: 'bin-spot-color', loadChildren: () => import('./component/feature/bin-spot-color/bin-spot-color.module').then(m => m.BinSpotColorModule) },

  //{ path: 'bin-type', loadChildren: () => import('./component/feature/bin-type/bin-type.module').then(m => m.BinTypeModule) },
  //{ path: 'dashboard', loadChildren: () => import('./component/feature/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: "**", component: LoginNewComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      useHash: true,
      preloadingStrategy: CustomPreloadingService,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
