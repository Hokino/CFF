import { PieChartComponent } from './shared/pie-chart/pie-chart.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app.routing';
import { DropdownDirective } from './shared/dropdown.directive';
import { BarChartComponent } from './shared/bar-chart/bar-chart.component';
import { DetailsComponent } from './details/details.component';
import { SummaryComponent } from './summary/summary.component';
import { HomeComponent } from './home/home.component';
import { LinechartComponent } from './shared/linechart/linechart.component';
import { CffGraphsComponent } from './cff-graphs/cff-graphs.component';


@NgModule({
  declarations: [
    AppComponent,
    PieChartComponent,
    DropdownDirective,
    HeaderComponent,
    LinechartComponent,
    BarChartComponent,
    DetailsComponent,
    SummaryComponent,
    HomeComponent,
    CffGraphsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgxChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
