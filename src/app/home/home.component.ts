import { Component, OnInit } from '@angular/core';
import { StorePackingService } from '../service/store-ids.service';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../service/localstorage.service';
import { DisplayIdService } from '../service/display-id.service';
import { User } from '../user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  storeObjects: any; // store all the objects here -> apply filter on this
  storeIds: any; // changing it on runtime
  tempKeys: string[] = []; // storing temporarily
  search: string = '';
  displayUsers: any;
  currentUser: User | undefined;

  toastOptions: Partial<IndividualConfig> = {
    positionClass: 'toast-bottom-right'
  };


  constructor(private makeCall: DisplayIdService, private getPackings: StorePackingService, private toastr: ToastrService, private http: HttpClient, private saveToStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.makeCall.fetchData2().subscribe((res) => {
      console.log("response from mock api : ", res);
      this.storeObjects = res; // store all object here
      this.storeIds = res; // back-up of all objects
      this.tempKeys = this.storeIds; // 
      this.getPackings.storeKeys = this.storeIds; // maintining data globally
    })
  }

  filterData() {

    this.storeIds = this.tempKeys;
    console.log("Id to search is : ", this.search);
    console.log("Available objects are : ", this.storeObjects);

    let filteredDataByName = this.storeObjects.filter((item: any) => item.id === this.search);


    if (filteredDataByName.length != 0) {
      this.storeIds = filteredDataByName;
      this.toastr.success('Fetched Records Successfully', 'Success,', this.toastOptions);
      console.log("I have found the details ", filteredDataByName);
    }

    if (filteredDataByName.length == 0) {
      this.toastr.error('Please enter valid record !! Record not found', 'Error', this.toastOptions);
      console.log("I have not found the details");
    }
  }

  getUserData(data: { name: string, email: string, password: string }) {

    this.currentUser = data;
    console.log(this.currentUser, 'is current user ');
    // send data to url 
    this.http.post('https://6605741d2ca9478ea1805994.mockapi.io/packingdetails/users', data).subscribe((res) => {
      console.log("Data stored successfully..", res);
      this.toastr.success("User saved successfully !!", 'Success', this.toastOptions);
      this.saveToStorage.storeEncryptedUserData(data);
      console.log("The decrypted data is : ", this.saveToStorage.getDecryptedUserData());
    })

    this.http.get('https://6605741d2ca9478ea1805994.mockapi.io/packingdetails/users').subscribe((res) => {
      console.log("All the users are : ", res);
      this.displayUsers = res;
    })
  }
}


