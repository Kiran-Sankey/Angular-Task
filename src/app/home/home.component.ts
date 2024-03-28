import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DisplayIdService } from '../display-id.service';
import { StorePackingService } from '../service/store-movies.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { isEmpty } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  myKeys: any;
  saveKeys: string[] = [];
  saveNames: string[] = [];
  saveCompany: string[] = [];
  constructor(private route: Router, private makeCall: DisplayIdService, private getPackings: StorePackingService, private toastr: ToastrService, private http: HttpClient) { }
  search: string = '';

  ngOnInit(): void {
    this.getId();
    // this.getObjectKeys(this.myKeys);
  }

  getId() {
    this.makeCall.fetchData().subscribe(
      (res) => {
        this.myKeys = res;
        this.saveKeys = this.myKeys;
        this.getPackings.storeKeys = this.myKeys;
        console.log("The data is : ", this.myKeys);
        console.log("the list of id are : ", this.getPackings.storeKeys)
      },
      (error) => {
        console.error("Error fetching data:", error);
      }, () => {
        console.log("Fetch completed");
      }
    );

  }
  filterData() {

    this.myKeys = this.saveKeys;
    console.log("Id to search is : ", this.search);
    console.log("Available keys are : ", this.myKeys);


    let filteredDataByName = this.myKeys.filter((item: any) => item.id === this.search);


    if (filteredDataByName.length != 0) {
      this.myKeys = filteredDataByName;
      this.toastr.success('Fetched Records Successfully');
      console.log("I have found the details ", filteredDataByName);
    }

    if (filteredDataByName.length == 0) {
      this.toastr.error('Please enter valid record !! Record not found');
      console.log("I have not found the details");
    }
  }

  getUserData(data: { name: string, email: string, password: string }) {
    console.log(data);
    this.http.post('http://localhost:5000/users', data).subscribe((res) => {
      console.log("Data stored successfully..", data);

      this.toastr.success("User saved successfully !!");
    })
  }

}


