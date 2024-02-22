import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { AboutComponent } from './about.component';
import { CreateJobFormComponent } from './components/create-job-form/create-job-form.component';
import { JobFormComponent } from './components/job-form/job-form.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', redirectTo: '/job-board', pathMatch: 'full' },
  { path: '', component: AboutComponent, data: { title: marker('Job Board') } },
  { path: 'create-job-form', component: CreateJobFormComponent, data: { title: marker('Create Job Form') } },
  { path: 'job-form', component: JobFormComponent, data: { title: marker('Job Form') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AboutRoutingModule {}
