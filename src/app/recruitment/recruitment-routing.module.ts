import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { RecruitmentComponent } from './recruitment.component';

const routes: Routes = [{ path: '', component: RecruitmentComponent, data: { title: marker('Candidate') } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class RecruitmentRoutingModule {}
