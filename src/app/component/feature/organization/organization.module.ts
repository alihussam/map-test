import { NgModule } from '@angular/core';
import { CommonConfigModule } from 'src/app/shared-modules/commonConfig.module';
import { OrganizationAddComponent } from './organization-add/organization-add.component';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationUpdateComponent } from './organization-update/organization-update.component';
import { OrganizationComponent } from './organization.component';

@NgModule({
  declarations: [
    OrganizationComponent,
    OrganizationAddComponent,
    OrganizationUpdateComponent,
  ],
  imports: [
    OrganizationRoutingModule,
    CommonConfigModule,
  ],
})
export class OrganizationModule { }
