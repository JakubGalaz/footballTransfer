import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferServiceService } from '../transfer-service.service';
import {TransferRecord} from './../transferRecord';
import { parse } from 'querystring';
import { FormControl } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts/lib/base-chart.directive';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

export interface League{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})

export class LeaguesComponent implements OnInit {

  @ViewChild('baseChart',   {static: false} ) chart: BaseChartDirective

  laLigaList: TransferRecord[] = [];

  leagues: League[] = [
  {value: 'LaLiga', viewValue: 'La Liga'},
  {value: 'SerieA', viewValue: 'Serie A'},
  {value: 'Ligue1', viewValue: 'Ligue 1'},
  {value: 'PremierLeague', viewValue: 'Premier League'},
  {value: 'BundesLiga', viewValue: 'BundesLiga'},
  ]



  ngOnInit(): void {

    var a = 0;
    for(var i = 0; i <this.transferService.sortedData.length; i++)
    {
      if( this.transferService.sortedData[i].League_to === 'LaLiga')
      {this.laLigaList[a] = this.transferService.sortedData[i];
        a++;

      }

    }

    this.barChartData.push({ data: [this.LaLigaAVG('Right Winger')],
      label:'Right Winger'});
    this.barChartData.push({ data: [this.LaLigaAVG('Left Winger')],
    label: 'Left Winger'});
    this.barChartData.push({ data: [this.LaLigaAVG('Centre-Forward')],
    label: 'Centre-Forward'});
    this.barChartData.push({ data: [this.LaLigaAVG('Centre-Back')],
    label: 'Centre-Back'});
    this.barChartData.push({ data: [this.LaLigaAVG('Central Midfield')],
    label: 'Central Midfield'});
    this.barChartData.push({ data: [this.LaLigaAVG('Attacking Midfield')],
    label: 'Attacking Midfield'});
    this.barChartData.push({ data: [this.LaLigaAVG('Defensive Midfield')],
    label: 'Defensive Midfield'});









  }






  constructor(public http: HttpClient, public transferService: TransferServiceService) {


  }



  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['Position'];

  public barChartType = 'bar';

  public barChartLegend = true;

  public barChartData = [];







    // tslint:disable-next-line: member-ordering
    public labels: Array<any> = ['Position'];

    // tslint:disable-next-line: member-ordering
    public colors: Array<any> = [
      {
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',

        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 2,
      }
    ];



    public options: any = {
      responsive: true
    };







    public chartClicked(e: any): void { }
    public chartHovered(e: any): void { }


    public LaLigaAVG(positionName: string){

//positionName = 'Right Winger'
var sum: number;
var counter: number;
counter = 0;
sum = 0;
var i=0;

for(i=0; i < this.laLigaList.length; i++)
{
  if(this.laLigaList[i].Position === positionName){
sum =sum+ this.laLigaList[i].Transfer_fee;
counter = counter +1;


  }

}

var avg = sum/counter;

console.log(avg);

return avg;

    }






}
