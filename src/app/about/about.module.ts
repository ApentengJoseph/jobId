import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MaterialModule } from '@app/material.module';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { CreateJobFormComponent } from './components/create-job-form/create-job-form.component';
import { JobFormComponent } from './components/job-form/job-form.component';
import { CreateJobDialogComponent } from './components/dialog-job-form/dialog-job-form.component';

@NgModule({
  imports: [CommonModule, CdkStepperModule, TranslateModule, FlexLayoutModule, MaterialModule, AboutRoutingModule],
  declarations: [AboutComponent, CreateJobFormComponent, JobFormComponent, CreateJobDialogComponent],
})
export class AboutModule {}
