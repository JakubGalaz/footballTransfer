import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferServiceService } from '../transfer-service.service';
import { TransferRecord } from '../transferRecord';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';


export interface League{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css']
})
export class TotalComponent implements OnInit {

  sortPlayers;
  topPlayers: TransferRecord[] = [];

  laLigaList: TransferRecord[] = [];

  public lineChartLabels: Label[] = ['2000-2001', '2001-2002', '2002-2003', '2003-2004',
  '2004-2005', '2005-2006', '2006-2007', '2007-2008', '2008-2009', '2009-2010',
'2010-2011', '2011-2012', '2012-2013', '2013-2014', '2014-2015', '2015-2016',
'2016-2017', '2017-2018', '2018-2019'];
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


  leagues: League[] = [
  {value: 'LaLiga', viewValue: 'La Liga'},
  {value: 'SerieA', viewValue: 'Serie A'},
  {value: 'Ligue1', viewValue: 'Ligue 1'},
  {value: 'PremierLeague', viewValue: 'Premier League'},
  {value: 'BundesLiga', viewValue: 'BundesLiga'},
  ]


  public polarAreaChartLabels: Label[] = ['Right Winger', 'Left Winger', 'Centre-Forward', 'Centre-Back', 'Central Midfield',
  'Attacking Midfield', 'Defensive Midfield', 'Defensive Midfield', 'Second Striker', 'Goalkeeper',
  'Right-Back', 'Left-Back', 'Right Midfield', 'Left Midfield'
 ];
  public polarAreaChartData: SingleDataSet = [];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';


  constructor(public http: HttpClient, public transferService: TransferServiceService) {


   }


  ngOnInit() {


    this.barChartData.push({ data: [this.AVGPosition('Right Winger')],
      label:'Right Winger'});
    this.barChartData.push({ data: [this.AVGPosition('Left Winger')],
    label: 'Left Winger'});
    this.barChartData.push({ data: [this.AVGPosition('Centre-Forward')],
    label: 'Centre-Forward'});
    this.barChartData.push({ data: [this.AVGPosition('Centre-Back')],
    label: 'Centre-Back'});
    this.barChartData.push({ data: [this.AVGPosition('Central Midfield')],
    label: 'Central Midfield'});
    this.barChartData.push({ data: [this.AVGPosition('Attacking Midfield')],
    label: 'Attacking Midfield'});
    this.barChartData.push({ data: [this.AVGPosition('Defensive Midfield')],
    label: 'Defensive Midfield'});
    this.barChartData.push({ data: [this.AVGPosition('Second Striker')],
    label: 'Second Striker'});
    this.barChartData.push({ data: [this.AVGPosition('Goalkeeper')],
    label: 'Goalkeeper'});
    this.barChartData.push({ data: [this.AVGPosition('Right-Back')],
    label: 'Right-Back'});
    this.barChartData.push({ data: [this.AVGPosition('Left-Back')],
    label: 'Left-Back'});
    this.barChartData.push({ data: [this.AVGPosition('Right Midfield')],
    label: 'Right Midfield'});
    this.barChartData.push({ data: [this.AVGPosition('Left Midfield')],
    label: 'Left Midfield'});

    this.polarAreaChartData.push(this.sumPosition('Right Winger'));
    this.polarAreaChartData.push(this.sumPosition('Left Winger'));
    this.polarAreaChartData.push(this.sumPosition('Centre-Forward'));
    this.polarAreaChartData.push(this.sumPosition('Centre-Back'));
    this.polarAreaChartData.push(this.sumPosition('Central Midfield'));
    this.polarAreaChartData.push(this.sumPosition('Attacking Midfield'));
    this.polarAreaChartData.push(this.sumPosition('Defensive Midfield'));
    this.polarAreaChartData.push(this.sumPosition('Second Striker'));
    this.polarAreaChartData.push(this.sumPosition('Goalkeeper'));
    this.polarAreaChartData.push(this.sumPosition('Left-Back'));
    this.polarAreaChartData.push(this.sumPosition('Right Midfield'));
    this.polarAreaChartData.push(this.sumPosition('Left Winger'));
    this.polarAreaChartData.push(this.sumPosition('Left Midfield'));


    this.sortPlayers = this.transferService.sortedData.sort((a, b) => (a.Transfer_fee < b.Transfer_fee) ? 1: -1);

    for(var i = 0; i < 25; i++){
    this.topPlayers.push(this.sortPlayers[i]);
    }





  }




  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['Seasons'];

  public barChartType = 'bar';

  public barChartLegend = true;

  public barChartData = [];

  public lineChartData: ChartDataSets[] = [
    { data: [
      this.AVGSeason('2000-2001'),
      this.AVGSeason('2001-2002'),
      this.AVGSeason('2002-2003'),
      this.AVGSeason('2003-2004'),
      this.AVGSeason('2004-2005'),
      this.AVGSeason('2005-2006'),
      this.AVGSeason('2006-2007'),
      this.AVGSeason('2007-2008'),
      this.AVGSeason('2008-2009'),
      this.AVGSeason('2009-2010'),
      this.AVGSeason('2010-2011'),
      this.AVGSeason('2011-2012'),
      this.AVGSeason('2012-2013'),
      this.AVGSeason('2013-2014'),
      this.AVGSeason('2014-2015'),
      this.AVGSeason('2015-2016'),
      this.AVGSeason('2016-2017'),
      this.AVGSeason('2017-2018'),
      this.AVGSeason('2018-2019'),


    ], label: 'Average' }];







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


    public AVGPosition(positionName: string){


      var sum: number;
      var counter: number;
      counter = 0;
      sum = 0;
      var i=0;

      for(i=0; i < this.transferService.sortedData.length; i++)
      {
        if(this.transferService.sortedData[i].Position === positionName){
      sum =sum+ this.transferService.sortedData[i].Transfer_fee;
      counter = counter +1;


        }

      }

      var avg = sum/counter;



      return avg;

          }


    public AVGSeason(season: string){


      var sum: number;
      var counter: number;
      counter = 0;
      sum = 0;
      var i=0;

      for(i=0; i < this.transferService.sortedData.length; i++)
      {
        if(this.transferService.sortedData[i].Season === season){
      sum =sum+ this.transferService.sortedData[i].Transfer_fee;
      counter = counter +1;


        }

      }

      var avg = sum/counter;



      return avg;

          }

          public sumPosition(position: string){



            var counter: number;
            counter = 0;

            var i=0;

            for(i=0; i < this.transferService.sortedData.length; i++)
            {
              if(this.transferService.sortedData[i].Position === position){

            counter = counter +1;


              }

            }





            return counter;

                }



}
