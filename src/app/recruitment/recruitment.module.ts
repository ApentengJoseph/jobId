import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '@shared';
import { MaterialModule } from '@app/material.module';
import { RecruitmentRoutingModule } from './recruitment-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { RecruitmentComponent } from './recruitment.component';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    TranslateModule,
    FormsModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    RecruitmentRoutingModule,
  ],
  declarations: [RecruitmentComponent],
})
export class RecruitmentModule {}
