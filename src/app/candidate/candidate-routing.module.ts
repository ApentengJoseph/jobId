import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { CandidateComponent } from './candidate.component';

const routes: Routes = [
  Shell.childRoutes([{ path: '', component: CandidateComponent, data: { title: marker('Candidate') } }]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class CandidateRoutingModule {}
