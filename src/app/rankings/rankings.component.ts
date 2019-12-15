import { Component, OnInit } from '@angular/core';
import regression from 'regression';
import * as Highcharts from 'highcharts';
import {HttpClient} from "@angular/common/http";
import {TransferServiceService} from "../transfer-service.service";
import {TransferRecord} from "../transferRecord";
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';


export interface League{
  value: string;
  viewValue: string;
}

export interface Regression {
  x: number;
  y: number;

}



@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent implements OnInit {

  sortPlayers: TransferRecord[] = [];
  chartPlayers: TransferRecord[] = [];
  playersAgePrice: number[][] = [[0,0]];
  //new Charts module
  Highcharts: typeof Highcharts = Highcharts;
  sortedAge: number[] = [];
  sortedPrice: number[] = [];
  sortedMarketValue: number[] = [];
  sortedPriceShort: number[] = [];
  feeMarketValueCorrelation;
  ageFeeCorrelation;
  seasonCorrelation;
  positionCorrelation;

  regressionArray: Regression[] = [{x: 1, y:2}, {x: 3, y : 7}];


  chartOptions;

//barChart
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartLabels = ['Age'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [];
  public barChartDataLeagueFrom = [];
  public barChartDataLeagueTo = [];

  constructor(public http: HttpClient, public transferService: TransferServiceService)
  {

    this.barChartData.push({ data: [this.sumTransferAge(15,this.transferService.sortedData)],
      label:'15'});
    this.barChartData.push({ data: [this.sumTransferAge(16,this.transferService.sortedData)],
      label:'16'});
    this.barChartData.push({ data: [this.sumTransferAge(17,this.transferService.sortedData)],
      label:'17'});
    this.barChartData.push({ data: [this.sumTransferAge(18,this.transferService.sortedData)],
      label:'18'});
    this.barChartData.push({ data: [this.sumTransferAge(19,this.transferService.sortedData)],
      label:'19'});
    this.barChartData.push({ data: [this.sumTransferAge(20,this.transferService.sortedData)],
      label:'20'});
    this.barChartData.push({ data: [this.sumTransferAge(21,this.transferService.sortedData)],
      label:'21'});
    this.barChartData.push({ data: [this.sumTransferAge(22,this.transferService.sortedData)],
      label:'22'});
    this.barChartData.push({ data: [this.sumTransferAge(23,this.transferService.sortedData)],
      label:'23'});
    this.barChartData.push({ data: [this.sumTransferAge(24,this.transferService.sortedData)],
      label:'24'});
    this.barChartData.push({ data: [this.sumTransferAge(25,this.transferService.sortedData)],
      label:'25'});
    this.barChartData.push({ data: [this.sumTransferAge(26,this.transferService.sortedData)],
      label:'26'});
    this.barChartData.push({ data: [this.sumTransferAge(27,this.transferService.sortedData)],
      label:'27'});
    this.barChartData.push({ data: [this.sumTransferAge(28,this.transferService.sortedData)],
      label:'28'});
    this.barChartData.push({ data: [this.sumTransferAge(29,this.transferService.sortedData)],
      label:'29'});
    this.barChartData.push({ data: [this.sumTransferAge(30,this.transferService.sortedData)],
      label:'30'});
    this.barChartData.push({ data: [this.sumTransferAge(31,this.transferService.sortedData)],
      label:'31'});
    this.barChartData.push({ data: [this.sumTransferAge(32,this.transferService.sortedData)],
      label:'32'});
    this.barChartData.push({ data: [this.sumTransferAge(33,this.transferService.sortedData)],
      label:'33'});
    this.barChartData.push({ data: [this.sumTransferAge(34,this.transferService.sortedData)],
      label:'34'});
    this.barChartData.push({ data: [this.sumTransferAge(35,this.transferService.sortedData)],
      label:'35'});


    this.barChartDataLeagueFrom.push({ data: [this.sumTransferLeagueFrom('LaLiga',this.transferService.sortedData)],
    label:'LaLiga'});
    this.barChartDataLeagueFrom.push({ data: [this.sumTransferLeagueFrom('Serie A',this.transferService.sortedData)],
      label:'SerieA'});
    this.barChartDataLeagueFrom.push({ data: [this.sumTransferLeagueFrom('Ligue 1',this.transferService.sortedData)],
      label:'Ligue 1'});
    this.barChartDataLeagueFrom.push({ data: [this.sumTransferLeagueFrom('Premier League',this.transferService.sortedData)],
      label:'Premier League'});
    this.barChartDataLeagueFrom.push({ data: [this.sumTransferLeagueFrom('1.Bundesliga',this.transferService.sortedData)],
      label:'Bundesliga'});
    this.barChartDataLeagueFrom.push({ data: [this.sumTransferLeagueFrom('2.Bundesliga',this.transferService.sortedData)],
      label:'Bundesliga'});
    this.barChartDataLeagueFrom.push({ data: [this.sumTransferLeagueFrom('Premier Liga',this.transferService.sortedData)],
      label:'Premier Liga'});
    this.barChartDataLeagueFrom.push({ data: [this.sumTransferLeagueFrom('Liga NOS',this.transferService.sortedData)],
      label:'Liga NOS'});
    this.barChartDataLeagueFrom.push({ data: [this.sumTransferLeagueFrom('Eredivisie',this.transferService.sortedData)],
      label:'Eredivisie'});
    this.barChartDataLeagueFrom.push({ data: [this.sumTransferLeagueFrom('Eredivisie',this.transferService.sortedData)],
      label:'Brazil'});
    this.barChartDataLeagueFrom.push({ data: [this.sumTransferLeagueFrom('Super League',this.transferService.sortedData)],
      label:'Super League'});
    this.barChartDataLeagueFrom.push({ data: [this.sumTransferLeagueFrom('Croatia',this.transferService.sortedData)],
      label:'Croatia'});
    this.barChartDataLeagueFrom.push({ data: [this.sumTransferLeagueFrom('Argentina',this.transferService.sortedData)],
      label:'Argentina'});
    this.barChartDataLeagueFrom.push({ data: [this.sumTransferLeagueFrom('LaLiga2',this.transferService.sortedData)],
      label:'Secunda Division'});
    this.barChartDataLeagueFrom.push({ data: [this.sumTransferLeagueFrom('Uruguay',this.transferService.sortedData)],
      label:'Uruguay'});
    this.barChartDataLeagueFrom.push({ data: [this.sumTransferLeagueFrom('Scotland',this.transferService.sortedData)],
      label:'Scotland'});

    this.barChartDataLeagueTo.push({ data: [this.sumTransferLeagueTo('LaLiga',this.transferService.sortedData)],
      label:'LaLiga'});
    this.barChartDataLeagueTo.push({ data: [this.sumTransferLeagueTo('Serie A',this.transferService.sortedData)],
      label:'SerieA'});
    this.barChartDataLeagueTo.push({ data: [this.sumTransferLeagueTo('Ligue 1',this.transferService.sortedData)],
      label:'Ligue 1'});
    this.barChartDataLeagueTo.push({ data: [this.sumTransferLeagueTo('Premier League',this.transferService.sortedData)],
      label:'Premier League'});
    this.barChartDataLeagueTo.push({ data: [this.sumTransferLeagueTo('1.Bundesliga',this.transferService.sortedData)],
      label:'Bundesliga'});
    this.barChartDataLeagueTo.push({ data: [this.sumTransferLeagueTo('2.Bundesliga',this.transferService.sortedData)],
      label:'Bundesliga'});
    this.barChartDataLeagueTo.push({ data: [this.sumTransferLeagueTo('Premier Liga',this.transferService.sortedData)],
      label:'Premier Liga'});
    this.barChartDataLeagueTo.push({ data: [this.sumTransferLeagueTo('Liga NOS',this.transferService.sortedData)],
      label:'Liga NOS'});
    this.barChartDataLeagueTo.push({ data: [this.sumTransferLeagueTo('Eredivisie',this.transferService.sortedData)],
      label:'Eredivisie'});
    this.barChartDataLeagueTo.push({ data: [this.sumTransferLeagueTo('Eredivisie',this.transferService.sortedData)],
      label:'Brazil'});
    this.barChartDataLeagueTo.push({ data: [this.sumTransferLeagueTo('Super League',this.transferService.sortedData)],
      label:'Super League'});
    this.barChartDataLeagueTo.push({ data: [this.sumTransferLeagueTo('Croatia',this.transferService.sortedData)],
      label:'Croatia'});
    this.barChartDataLeagueTo.push({ data: [this.sumTransferLeagueTo('Argentina',this.transferService.sortedData)],
      label:'Argentina'});
    this.barChartDataLeagueTo.push({ data: [this.sumTransferLeagueTo('LaLiga2',this.transferService.sortedData)],
      label:'Secunda Division'});
    this.barChartDataLeagueTo.push({ data: [this.sumTransferLeagueTo('Uruguay',this.transferService.sortedData)],
      label:'Uruguay'});
    this.barChartDataLeagueTo.push({ data: [this.sumTransferLeagueTo('Scotland',this.transferService.sortedData)],
      label:'Scotland'});




    this.sortPlayers = this.transferService.sortedData.sort((a, b) => (a.Age > b.Age) ? 1: -1);
  //  var tmpAge = this.transferService.sortedData.sort((a, b) => (a.Age > b.Age) ? 1: -1);
   // var tmpPrice = this.transferService.sortedData.sort((a, b) => (a.Transfer_fee > b.Transfer_fee) ? 1: -1);
    var seasonArray: number[] = [];
    var positionsArray: number[] = [];


    for(let i =0; i < this.transferService.sortedData.length; i++){
      this.sortedAge.push(this.transferService.sortedData[i].Age);
      this.sortedPrice.push(this.transferService.sortedData[i].Transfer_fee);
      seasonArray.push(this.transferService.newData[i].Season);
      positionsArray.push(this.transferService.newData[i].Position);



    }

    for(let i =0; i < this.transferService.sortedData.length; i++){
      if(this.transferService.sortedData[i].Market_value !== 'NA'){
        this.sortedPriceShort.push(this.transferService.sortedData[i].Transfer_fee)
        this.sortedMarketValue.push(this.transferService.sortedData[i].Market_value)
      }



    }


    this.feeMarketValueCorrelation = getPearsonCorrelation( this.sortedPriceShort, this.sortedMarketValue);
    this.ageFeeCorrelation = getPearsonCorrelation(this.sortedPrice, this.sortedAge);
    this.positionCorrelation = getPearsonCorrelation(positionsArray, this.sortedPrice);
    this.seasonCorrelation = getPearsonCorrelation(seasonArray, this.sortedPrice);

    console.log('Pozycje i cena: ' + this.positionCorrelation);
    console.log('sezony i cena: ' + this.seasonCorrelation);




    for(let  i=0; i < this.sortPlayers.length; i++)
    {
      this.playersAgePrice.push([this.sortPlayers[i].Age, this.sortPlayers[i].Transfer_fee]);
    }







    this.chartOptions =  {
      title : {
        text: 'Price dependence on age'
      },
      xAxis : {
        min: 14,
        max: 36
      },
      yAxis : {
        min: 100000
      },
      series : [
        {
          type: 'line',
          name: 'Regression Line',
          // data: [[1646.111, 0], [0, 9589370.67]],
          data: [[17, 9490337,68], [40, 9356351,87]],
          marker: {
            enabled: false
          },
          states: {
            hover: {
              lineWidth: 0
            }
          },
          enableMouseTracking: false
        },
        {
          type: 'scatter',
          name: 'Players',
          data: this.playersAgePrice,
          marker: {
            radius: 4
          }
        }]
    };





    var data = [[27,60000000],[25,56810000]];

    for(var i = 2; i < this.transferService.sortedData.length; i++)
    {

      data.push([this.transferService.sortedData[i].Age, this.transferService.sortedData[i].Transfer_fee])
    }





    const result = regression.linear(data);


  }

  ngOnInit() {
  }


  public sumTransferAge(age: number, playersArray: TransferRecord[]){
    var counter: number;
    counter = 0;
    var i;
    for(i =0; i < playersArray.length; i++)
    {
      if(playersArray[i].Age === age)
      {
        counter = counter +1;
      }

    }

    return counter;

  }

  public sumTransferLeagueFrom(league: string, playersArray: TransferRecord[]) {
    var counter: number;
    counter = 0;
    var i;
    for (i = 0; i < playersArray.length; i++) {
      if (playersArray[i].League_from === league) {
        counter = counter + 1;
      }

    }

    return counter;
  }

  public sumTransferLeagueTo(league: string, playersArray: TransferRecord[]){
      var counter: number;
      counter = 0;
      var i;
      for(i =0; i < playersArray.length; i++)
      {
        if(playersArray[i].League_to === league)
        {
          counter = counter +1;
        }

      }

    return counter;

  }


  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }


}



function getPearsonCorrelation(x, y) {
  var shortestArrayLength = 0;

  if (x.length == y.length) {
    shortestArrayLength = x.length;
  } else if (x.length > y.length) {
    shortestArrayLength = y.length;
    console.log('x has more items in it, the last ' + (x.length - shortestArrayLength) + ' item(s) will be ignored');
  } else {
    shortestArrayLength = x.length;
    console.log('y has more items in it, the last ' + (y.length - shortestArrayLength) + ' item(s) will be ignored');
  }

  var xy = [];
  var x2 = [];
  var y2 = [];

  for (var i = 0; i < shortestArrayLength; i++) {
    xy.push(x[i] * y[i]);
    x2.push(x[i] * x[i]);
    y2.push(y[i] * y[i]);
  }

  var sum_x = 0;
  var sum_y = 0;
  var sum_xy = 0;
  var sum_x2 = 0;
  var sum_y2 = 0;

  for (var i = 0; i < shortestArrayLength; i++) {
    sum_x += x[i];
    sum_y += y[i];
    sum_xy += xy[i];
    sum_x2 += x2[i];
    sum_y2 += y2[i];
  }

  var step1 = (shortestArrayLength * sum_xy) - (sum_x * sum_y);
  var step2 = (shortestArrayLength * sum_x2) - (sum_x * sum_x);
  var step3 = (shortestArrayLength * sum_y2) - (sum_y * sum_y);
  var step4 = Math.sqrt(step2 * step3);
  var answer = step1 / step4;

  return answer;
}
