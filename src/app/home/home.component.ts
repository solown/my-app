import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import { JSONPlaceholderService } from '../services/jsonplaceholder.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private JSONPlaceholder:JSONPlaceholderService){}
  getDataFromApi(){
    this.JSONPlaceholder.getData(null, null, null).subscribe((data) => {
      console.log(data)
    })
  }
   LineChart = [];
  ngOnInit(){  
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
