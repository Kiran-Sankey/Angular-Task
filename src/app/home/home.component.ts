import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchdataService } from '../fetchdata.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  keys: string[] | undefined;

  constructor(private route: Router, private supdata: FetchdataService) { }

  ngOnInit(): void {
    this.getKeysOfObject();
  }

  getKeysOfObject() {
    this.supdata.fetchData().subscribe(
      (response) => {
        // this.keys = keys;
        console.log("The keys are: ", response);
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );
    // displayDetails() {
    //   this.route.navigate(['displaydata']);
    // }
  }
}
