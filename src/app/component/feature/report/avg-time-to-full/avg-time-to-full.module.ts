import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvgTimeToFullRoutingModule } from './avg-time-to-full-routing.module';
import { AvgTimeToFullComponent } from './avg-time-to-full.component';


@NgModule({
  declarations: [AvgTimeToFullComponent],
  imports: [
    CommonModule,
    AvgTimeToFullRoutingModule
  ]
})
export class AvgTimeToFullModule { }
