import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { StorePackingService } from './service/store-movies.service';
@Injectable({
  providedIn: 'root'
})
export class DisplayIdService {

  packingDetails: any;
  oneDetail: any;
  newDetail: any;

  constructor(private http: HttpClient, private getPackings: StorePackingService
  ) {

  }

  fetchData(): Observable<object | undefined> {
    this.packingDetails = this.http.get<object>('http://localhost:3000/packingdetails');
    return this.packingDetails;
  };

  fetchDataUsingID(id: string) {
    this.oneDetail = this.getPackings.storeKeys;
    console.log("single detail is : ", this.oneDetail);
    this.newDetail = this.oneDetail.find((item: any) => item.id === id);
    console.log(this.newDetail + 'fetched latest')

    return this.newDetail;
  }
}
