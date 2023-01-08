import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from 'src/app/helper/authentication.guard';
import { MapComponent } from './map.component';
import { MapViewComponent } from './map-view/map-view.component';
//import { HistoryMapComponent } from './history-map/history-map.component';

const routes: Routes = [
  { path: '', component: MapComponent, canActivate: [AuthenticationGuard] },
  { path: 'map-view', component: MapViewComponent, canActivate: [AuthenticationGuard] },
  //{ path: 'history-map', component:  HistoryMapComponent,canActivate:[AuthenticationGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
