import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceAlertComponent } from './device-alert.component';
import { AuthenticationGuard } from 'src/app/helper/authentication.guard';

const routes: Routes = [
  { path: '', component:   DeviceAlertComponent ,canActivate:[AuthenticationGuard]},
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceAlertRoutingModule { }
