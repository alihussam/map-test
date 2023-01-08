import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from 'src/app/helper/authentication.guard';
import { OrganizationComponent } from './organization.component';



const routes: Routes = [
  { path: '', component: OrganizationComponent ,canActivate:[AuthenticationGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule{ }


