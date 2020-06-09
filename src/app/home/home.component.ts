import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import * as _ from 'lodash';

interface Course {
  description: string;
  courseListIcon:string;
  iconUrl:string;
  longDescription:string;
  url:string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  courses$: Observable< Course[] >;
  constructor(private http:HttpClient) {
    }

  LineChart = [];
  ngOnInit(){
    this.courses$ = this.http.get<Course[]("/courses.json").map(data => _.values(data)).do(console.log);
    //Line chart
    this.LineChart = new Chart('lineChart', {
      type:'line', 
        data:{
          labels:["Monday", "Tuesday", "Wednesday","Thursday", "Friday","Saturday","Sunday" ],
          datasets: 
          [{
            label:'Number of Iterms Sold',
            data:[9, 7, 3, 5, 2, 10, 15],
            fill: false,
            lineTension: 0.2,
            borderColor: "red",
            borderWidth: 1 
          }]
        },
        options:
        {
          title:
          {
            text: "Line Chart",
            display: true,
            maintainAspectRatio: false
          },
          scales:
          {
            yAxes:
            [{
              ticks:
              {
                beginAtZero: true
              }
            }]
          }
        }
      });
  }
}
