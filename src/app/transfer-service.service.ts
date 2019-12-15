import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TransferRecord} from './transferRecord';

@Injectable({
  providedIn: 'root'
})
export class TransferServiceService {

  MyList;
  sortedData: TransferRecord[];
  newData: TransferRecord[];

  constructor(public http: HttpClient) {

    this.getList().subscribe(post => {
      this.sortedData = post.slice();



    });

    this.getCorrelationList().subscribe(post => {
      this.newData = post.slice();



    });




  }


  getList(): Observable<Array<TransferRecord>> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<Array<TransferRecord>>('../assets/transfers.json');
    }


  getCorrelationList(): Observable<Array<TransferRecord>> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<Array<TransferRecord>>('../assets/newData.json');
  }

}
