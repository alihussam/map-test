import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceComponent } from './device.component';
import { AuthenticationGuard } from 'src/app/helper/authentication.guard';



const routes: Routes = [
  { path: '', component:  DeviceComponent ,canActivate:[AuthenticationGuard]}
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceRoutingModule { }
