import { Component, OnInit } from '@angular/core';
import { FetchdataService } from '../fetchdata.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit {

  // supplierInfo: object = {};
  dataToDisplay: any;

  approvData: any;
  supplierInfo: any;
  programInfo: any;
  displayImages: any;
  defaultImage: string = "https://imgs.search.brave.com/neBrELOnsfK49yJraJ6s05kKhr38cFT0UIFls9VbHr4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzM0LzgzLzIy/LzM2MF9GXzMzNDgz/MjI1NV9JTXh2ellS/eWdqZDIwVmxTYUlB/RlpyUVdqb3pRSDZC/US5qcGc";
  primaryPacking: any;
  secondarypkg: any;
  approvalInfo: any;
  closedXyz: any;
  theoreticalInfo: any;

  // userDate = '2024-03-21 12:00:00';
  // parseDate = this.utcDate.transform(this.userDate, 'yyyy-MM-ddTHH:mm:ss.SSSZ', 'UTC');



  constructor(private supdata: FetchdataService, private utcDate: DatePipe) { }

  ngOnInit(): void {
    this.supdata.fetchData().subscribe(response => {
      console.log("The data is : ", response);
      if (response) {
        this.dataToDisplay = response;
        this.approvData = this.dataToDisplay.approv[0];
        this.supplierInfo = this.dataToDisplay.supplierinfo[0];
        this.programInfo = this.dataToDisplay.programinfo[0];
        this.displayImages = this.dataToDisplay.imagesInfo[0];
        this.primaryPacking = this.dataToDisplay.primarypkg;
        this.secondarypkg = this.dataToDisplay.secondarypkg;
        this.approvalInfo = this.dataToDisplay.approvalInfo;
        this.closedXyz = this.dataToDisplay.shoppingLogsClosedXyz;
        this.theoreticalInfo = this.dataToDisplay.theoreticalXyz;
      }
    }, (error) => {
      console.log("some error was occurred ", error);
    }, () => {
      console.log("Data fetched successfully..")
    });

    // console.log(this.parseDate);
    console.log("approv data is : ", this.approvData);
    console.log(this.supplierInfo);
    console.log(this.programInfo);
    console.log(this.displayImages);
    console.log(this.primaryPacking);
    console.log(this.secondarypkg);
    console.log(this.approvalInfo);
    console.log(this.closedXyz);
    console.log(this.theoreticalInfo)
  }

}
