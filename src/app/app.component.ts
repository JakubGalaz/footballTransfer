import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferServiceService } from './transfer-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'footballTransfers';
  menuOption: 0;
  results;


  constructor(public http: HttpClient, public transferService: TransferServiceService) {



    this.transferService.MyList =
  // tslint:disable-next-line: no-shadowed-variable
  this.http.get('../assets/transfers.json').subscribe(data => {
    this.results = data;

    console.log(this.results[1].Name);


  });


}

}
