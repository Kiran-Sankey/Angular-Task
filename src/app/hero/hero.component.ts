import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Approval } from '../response.interface';
import { SupplierInfo } from '../response.interface';
import { programInfo } from '../response.interface';
import { Id } from '../response.interface';
import { approvalInfo } from '../response.interface';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { DisplayIdService } from '../service/display-id.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit {

  // supplierInfo: object = {};
  oneObject: any;
  Id: Id | undefined;
  approvData: Approval | undefined;
  supplierInfo: SupplierInfo | undefined;
  programInfo: programInfo | undefined;
  displayImages: any;
  defaultImage: string = "https://imgs.search.brave.com/neBrELOnsfK49yJraJ6s05kKhr38cFT0UIFls9VbHr4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzM0LzgzLzIy/LzM2MF9GXzMzNDgz/MjI1NV9JTXh2ellS/eWdqZDIwVmxTYUlB/RlpyUVdqb3pRSDZC/US5qcGc";
  primaryPacking: any;
  secondarypkg: any;
  approvalInform: approvalInfo | undefined;
  closedXyz: any;
  theoreticalInfo: any;

  infoArray: any = [];
  nestedObject = {};

  // userDate = '2024-03-21 12:00:00';
  // parseDate = this.utcDate.transform(this.userDate, 'yyyy-MM-ddTHH:mm:ss.SSSZ', 'UTC');


  constructor(private getList: DisplayIdService, private utcDate: DatePipe, private route: Router, private currentRoute: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit(): void {

    const Id = this.currentRoute.snapshot.paramMap.get('id');
    console.log("Current id is : ", Id);

    if (Id) {
      this.oneObject = this.getList.fetchDataUsingID(Id);
      console.log("I got the details : ", this.oneObject);
      // store the details you want to display
      this.Id = this.oneObject.id;
      this.approvData = this.oneObject.approv;
      this.supplierInfo = this.oneObject.supplierinfo;
      this.displayImages = this.oneObject.imagesInfo;
      this.programInfo = this.oneObject.programinfo;
      this.primaryPacking = this.oneObject.primarypkg;
      this.secondarypkg = this.oneObject.secondarypkg;
      this.closedXyz = this.oneObject.shoppingLogsClosedXyz;
      this.theoreticalInfo = this.oneObject.theoreticalXyz;
      this.approvalInform = this.oneObject.approvalInfo;
    }
  }

  openModal(imageUrl: string): void {
    const dialogRef = this.dialog.open(ImageModalComponent, {
      width: 'fit-content',
      data: { imageUrl }
    });
  }

  navigateBack() {
    this.route.navigate(['']);
  }

  exportToExcel() {

    console.log(this.oneObject);
    this.nestedObject = {
      'dimentino[0]': this.closedXyz.dimentions[0],
      'dimentino[1]': this.closedXyz.dimentions[1],
      'dimentino[2]': this.closedXyz.dimentions[2],
      'lifeOfReturn': this.closedXyz.lifeOfReturn,
      'loopSize': this.closedXyz.loopSize,
      'materialClass': this.closedXyz.materialClass,
      'No of pry pack per sec packs': this.closedXyz.noOfPryPacks,
      'terms': this.closedXyz.terms
    }

    this.infoArray.push(this.approvData, this.supplierInfo, this.programInfo, this.nestedObject);

    const concatenatedObject = Object.assign({}, ...this.infoArray);

    const ws = XLSX.utils.json_to_sheet([concatenatedObject]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Placeholder');

    XLSX.writeFile(wb, 'UserList.xlsx');
  }
}
