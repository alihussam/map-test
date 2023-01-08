import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvgTimeToFullComponent } from './avg-time-to-full.component';

const routes: Routes = [{ path: '', component: AvgTimeToFullComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvgTimeToFullRoutingModule { }
