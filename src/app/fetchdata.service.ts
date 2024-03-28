import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FetchdataService {

  constructor(private http: HttpClient) { }

  fetchData(): Observable<object | undefined> {
    return this.http.get<object>('http://localhost:3000/123456789');
  };

}
