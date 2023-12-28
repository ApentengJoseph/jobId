import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '@shared';
import { MaterialModule } from '@app/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AIMatchedWidgetComponent } from './components/ai-matched-widget/ai-matched-widget.component';
import { JobBoardWidgetComponent } from './components/pie-chart/pie-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BarChartComponent } from './components/bar-chart/bar-chart-component';
import { PieChart2Component } from './components/pie-chart-2/pie-chart-2.component';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent,
    BarChartComponent,
    PieChart2Component,
    AIMatchedWidgetComponent,
    JobBoardWidgetComponent,
  ],
})
export class HomeModule {}
