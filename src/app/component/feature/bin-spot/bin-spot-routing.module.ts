import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from 'src/app/helper/authentication.guard';
import { BinSpotComponent } from './bin-spot.component';



const routes: Routes = [
  { path: '', component:  BinSpotComponent, canActivate:[AuthenticationGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BinSpotRoutingModule { }
