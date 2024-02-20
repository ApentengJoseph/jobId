import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'job-board', loadChildren: () => import('./about/about.module').then((m) => m.AboutModule) },
  ]),
  Shell.childRoutes([
    { path: 'candidate', loadChildren: () => import('./candidate/candidate.module').then((m) => m.CandidateModule) },
  ]),
  Shell.childRoutes([
    {
      path: 'recruitment',
      loadChildren: () => import('./recruitment/recruitment.module').then((m) => m.RecruitmentModule),
    },
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
