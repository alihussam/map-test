import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeofenceComponent } from './geofence.component';
import { GeofenceDetailComponent } from './geofence-detail/geofence-detail.component';
import { AuthenticationGuard } from 'src/app/helper/authentication.guard';



const routes: Routes = [
  { path: '', component: GeofenceComponent ,canActivate:[AuthenticationGuard]},
  { path: '/geofence-detail', component:  GeofenceDetailComponent ,canActivate:[AuthenticationGuard]},
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeofenceRoutingModule { }
