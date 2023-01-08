import { NgModule } from '@angular/core';
import { CommonConfigModule } from 'src/app/shared-modules/commonConfig.module';
import { AssignSensorComponent } from './assign-sensor/assign-sensor.component';
import { DeviceAddComponent } from './device-add/device-add.component';
import { DeviceFileUploaderComponent } from './device-file-uploader/device-file-uploader.component';
import { DeviceRoutingModule } from './device-routing.module';
import { DeviceUpdateComponent } from './device-update/device-update.component';
import { DeviceComponent } from './device.component';

@NgModule({
  declarations: [
    DeviceComponent,
    DeviceAddComponent,
    DeviceUpdateComponent,
    AssignSensorComponent,
    DeviceFileUploaderComponent,
  ],
  imports: [
    DeviceRoutingModule,
    CommonConfigModule,
  ],
})
export class DeviceModule { }
