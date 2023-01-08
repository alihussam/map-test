import { NgModule } from '@angular/core';
import { CommonConfigModule } from 'src/app/shared-modules/commonConfig.module';
import { DeviceAlertComponent } from './device-alert.component';
import { DeviceAlertAddDialogComponent } from './device-alert-add-dialog/device-alert-add-dialog.component';
import { DeviceAlertUpdateDialogComponent } from './device-alert-update-dialog/device-alert-update-dialog.component';
import { DeviceAlertRoutingModule } from './device-alert-routing.module';

@NgModule({
  declarations: [
    DeviceAlertComponent,
    DeviceAlertAddDialogComponent,
    DeviceAlertUpdateDialogComponent,
  ],
  imports: [
    DeviceAlertRoutingModule,
    CommonConfigModule
  ]
})
export class DeviceAlertModule { }
