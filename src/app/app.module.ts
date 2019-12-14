import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TransferServiceService } from './transfer-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatChipsModule} from '@angular/material/chips';
import { LeaguesComponent } from './leagues/leagues.component';
import { RankingsComponent } from './rankings/rankings.component';
import { FormsModule } from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';
import {Sort} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { ChartsModule } from 'ng2-charts';
import { LineChartComponent } from './line-chart/line-chart.component';
import { TotalComponent } from './total/total.component';
import { HighchartsChartModule } from 'highcharts-angular';
//import { HighchartsChartComponent } from 'highcharts-angular';


//import {MatSelectModule} from '@angular/material/select';
//import { MatSliderModule } from '@angular/material/slider';



@NgModule({
  declarations: [
    AppComponent,
    LeaguesComponent,
    RankingsComponent,
    LineChartComponent,
    TotalComponent,





  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatSortModule,
    MatSelectModule,
    MatSliderModule,
    FormsModule,
    ChartsModule,
    HighchartsChartModule,
  ],
  providers: [TransferServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
