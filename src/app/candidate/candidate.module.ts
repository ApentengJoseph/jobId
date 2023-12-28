import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '@shared';
import { MaterialModule } from '@app/material.module';
import { CandidateRoutingModule } from './candidate-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CandidateComponent } from './candidate.component';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    CandidateRoutingModule,
  ],
  declarations: [CandidateComponent],
})
export class CandidateModule {}
