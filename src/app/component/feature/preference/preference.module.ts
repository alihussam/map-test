import { NgModule } from '@angular/core';
import { CommonConfigModule } from 'src/app/shared-modules/commonConfig.module';
import { PrefereneceComponent } from './preferenece.component';
import { PreferenceRoutingModule } from './preference-routing.module';
import { AddPreferenceComponent } from './add-preference/add-preference.component';
import { UpdatePreferenceComponent } from './update-preference/update-preference.component';

/**
 * @author MSA
 */

@NgModule({
  declarations: [
    PrefereneceComponent,
    AddPreferenceComponent,
    UpdatePreferenceComponent
  ],
  imports: [
    CommonConfigModule,
    PreferenceRoutingModule
  ]
})
export class PreferenceModule { }
