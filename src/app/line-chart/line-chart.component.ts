import { Component, OnInit } from '@angular/core';
import { TransferRecord } from '../transferRecord';
import { TransferServiceService } from '../transfer-service.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  laLigaList: TransferRecord[] = [];

  constructor(public transferService: TransferServiceService) { }

  ngOnInit() {



    var a = 0;
    for(var i = 0; i <this.transferService.sortedData.length; i++)
    {
      if( this.transferService.sortedData[i].League_to === 'LaLiga')
      {this.laLigaList[a] = this.transferService.sortedData[i];
        a++;

      }



    }
  }

}
