import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorePackingService } from './store-ids.service';


@Injectable({
    providedIn: 'root'
})
export class DisplayIdService {

    // packingDetails: any;
    packingDetails2: any;
    oneDetail: any;
    newDetail: any;

    constructor(private http: HttpClient, private getPackings: StorePackingService
    ) {

    }

    // fetchData(): Observable<object | undefined> {
    //     this.packingDetails = this.http.get<object>('http://localhost:3000/packingdetails');
    //     // this.packingDetails = this.http.get<object>('https://6605741d2ca9478ea1805994.mockapi.io/packingdetails/101');
    //     return this.packingDetails;
    // };

    fetchData2(): Observable<object | undefined> {
        this.packingDetails2 = this.http.get<object>('https://6605741d2ca9478ea1805994.mockapi.io/packingdetails/101');
        return this.packingDetails2;
    };


    fetchDataUsingID(id: string) {
        console.log("this is id----------->", id);
        this.oneDetail = this.getPackings.storeKeys;
        this.newDetail = this.oneDetail.find((item: any) => item.id === id);
        console.log(this.newDetail + 'fetched latest')

        return this.newDetail;
    }
}
