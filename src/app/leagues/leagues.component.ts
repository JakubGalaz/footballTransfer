import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferServiceService } from '../transfer-service.service';
import {TransferRecord} from './../transferRecord';
import { parse } from 'querystring';
import { FormControl } from '@angular/forms';
import { BaseChartDirective, Label } from 'ng2-charts/lib/base-chart.directive';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import {Color, SingleDataSet} from "ng2-charts";
import {isPlatformWorkerUi} from "@angular/common";

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

  topPlayers: TransferRecord[] = [];

  sortPlayers: TransferRecord[] = [];



  public lineChartLabels: Label[] = ['2000-2001', '2001-2002', '2002-2003', '2003-2004',
  '2004-2005', '2005-2006', '2006-2007', '2007-2008', '2008-2009', '2009-2010',
'2010-2011', '2011-2012', '2012-2013', '2013-2014', '2014-2015', '2015-2016',
'2016-2017', '2017-2018', '2018-2019'];

  leagues: League[] = [
  {value: 'LaLiga', viewValue: 'La Liga'},
  {value: 'SerieA', viewValue: 'Serie A'},
  {value: 'Ligue1', viewValue: 'Ligue 1'},
  {value: 'PremierLeague', viewValue: 'Premier League'},
  {value: 'BundesLiga', viewValue: 'BundesLiga'},
  ]

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,

    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [

    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';


  public polarAreaChartLabels: Label[] = ['Right Winger', 'Left Winger', 'Centre-Forward', 'Centre-Back', 'Central Midfield',
    'Attacking Midfield', 'Defensive Midfield', 'Defensive Midfield', 'Second Striker', 'Goalkeeper',
    'Right-Back', 'Left-Back', 'Right Midfield', 'Left Midfield'
  ];
  public polarAreaChartData: SingleDataSet = [];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';

  ngOnInit(): void {

    var a = 0;
    for (var i = 0; i < this.transferService.sortedData.length; i++) {
      if (this.transferService.sortedData[i].League_to === 'LaLiga') {
        this.laLigaList[a] = this.transferService.sortedData[i];
        a++;

      }

    }

    this.barChartData.push({
      data: [this.LaLigaAVG('Right Winger')],
      label: 'Right Winger'
    });
    this.barChartData.push({
      data: [this.LaLigaAVG('Left Winger')],
      label: 'Left Winger'
    });
    this.barChartData.push({
      data: [this.LaLigaAVG('Centre-Forward')],
      label: 'Centre-Forward'
    });
    this.barChartData.push({
      data: [this.LaLigaAVG('Centre-Back')],
      label: 'Centre-Back'
    });
    this.barChartData.push({
      data: [this.LaLigaAVG('Central Midfield')],
      label: 'Central Midfield'
    });
    this.barChartData.push({
      data: [this.LaLigaAVG('Attacking Midfield')],
      label: 'Attacking Midfield'
    });
    this.barChartData.push({
      data: [this.LaLigaAVG('Defensive Midfield')],
      label: 'Defensive Midfield'
    });
    this.barChartData.push({
      data: [this.LaLigaAVG('Second Striker')],
      label: 'Second Striker'
    });
    this.barChartData.push({
      data: [this.LaLigaAVG('Goalkeeper')],
      label: 'Goalkeeper'
    });
    this.barChartData.push({
      data: [this.LaLigaAVG('Right-Back')],
      label: 'Right-Back'
    });
    this.barChartData.push({
      data: [this.LaLigaAVG('Left-Back')],
      label: 'Left-Back'
    });
    this.barChartData.push({
      data: [this.LaLigaAVG('Right Midfield')],
      label: 'Right Midfield'
    });
    this.barChartData.push({
      data: [this.LaLigaAVG('Left Midfield')],
      label: 'Left Midfield'
    });


    this.polarAreaChartData.push(this.sumPosition('Right Winger', this.laLigaList));
    this.polarAreaChartData.push(this.sumPosition('Left Winger', this.laLigaList));
    this.polarAreaChartData.push(this.sumPosition('Centre-Forward', this.laLigaList));
    this.polarAreaChartData.push(this.sumPosition('Centre-Back', this.laLigaList));
    this.polarAreaChartData.push(this.sumPosition('Central Midfield', this.laLigaList));
    this.polarAreaChartData.push(this.sumPosition('Attacking Midfield', this.laLigaList));
    this.polarAreaChartData.push(this.sumPosition('Defensive Midfield', this.laLigaList));
    this.polarAreaChartData.push(this.sumPosition('Second Striker', this.laLigaList));
    this.polarAreaChartData.push(this.sumPosition('Goalkeeper', this.laLigaList));
    this.polarAreaChartData.push(this.sumPosition('Left-Back', this.laLigaList));
    this.polarAreaChartData.push(this.sumPosition('Right Midfield', this.laLigaList));
    this.polarAreaChartData.push(this.sumPosition('Left Winger', this.laLigaList));
    this.polarAreaChartData.push(this.sumPosition('Left Midfield', this.laLigaList));


    this.lineChartData.push({
      data: [
        this.avgSeason('2000-2001', this.laLigaList),
        this.avgSeason('2001-2002', this.laLigaList),
        this.avgSeason('2002-2003', this.laLigaList),
        this.avgSeason('2003-2004', this.laLigaList),
        this.avgSeason('2004-2005', this.laLigaList),
        this.avgSeason('2005-2006', this.laLigaList),
        this.avgSeason('2006-2007', this.laLigaList),
        this.avgSeason('2007-2008', this.laLigaList),
        this.avgSeason('2008-2009', this.laLigaList),
        this.avgSeason('2009-2010', this.laLigaList),
        this.avgSeason('2010-2011', this.laLigaList),
        this.avgSeason('2011-2012', this.laLigaList),
        this.avgSeason('2012-2013', this.laLigaList),
        this.avgSeason('2013-2014', this.laLigaList),
        this.avgSeason('2014-2015', this.laLigaList),
        this.avgSeason('2015-2016', this.laLigaList),
        this.avgSeason('2016-2017', this.laLigaList),
        this.avgSeason('2017-2018', this.laLigaList),
        this.avgSeason('2018-2019', this.laLigaList),


      ], label: 'Average'
    })


    this.sortPlayers = this.laLigaList.sort((a, b) => (a.Transfer_fee < b.Transfer_fee) ? 1 : -1);

    for (var i = 0; i < 25; i++) {
      this.topPlayers.push(this.sortPlayers[i]);


    }
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

  public lineChartData: ChartDataSets[] = [];





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


public sumPosition(position: string, playersArray: TransferRecord[]){
      var counter: number;
      counter = 0;
      var i;
      for(i =0; i < playersArray.length; i++)
      {
        if(playersArray[i].Position === position)
        {
          counter = counter +1;
        }

      }

      return counter;

}

public avgSeason(season: string, playersArray: TransferRecord[]){
      var sum: number;
      var counter: number;
      counter =0;
      sum = 0;
      var i = 0;

      for( i = 0; i < playersArray.length; i++){
        if(playersArray[i].Season === season)
        {
          sum = sum + playersArray[i].Transfer_fee;
          counter++;
        }
      }

      var avg = sum/counter;
      return avg;

}





}
