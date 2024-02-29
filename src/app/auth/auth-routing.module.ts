import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { LoginComponent } from './login.component';
import { PeopleSignUpComponent } from './people-sign-up/people-sign-up.component';
import { JobIndexComponent } from './job-index/job-index.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: marker('Login') } },
  {
    path: 'people-sign-in',
    component: PeopleSignUpComponent,
  },
  {
    path: 'job-index',
    component: JobIndexComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AuthRoutingModule {}
