import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import { JSONPlaceholderService } from '../services/jsonplaceholder.service';
// CardsFreeModule
import { tick } from '@angular/core/testing';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  _currentYears = [];
  myModel : any;
  LineChart = null;
  constructor(private JSONPlaceholder:JSONPlaceholderService){}

  ngOnInit(){ }


  getDataFromApi(){
    console.log(this._currentYears[0])
    console.log(this._currentYears[1])
    if (this._currentYears[0]==this._currentYears[1]){
      let birth = [];      
      strAnnee = this._currentYears[0].toString()
      this.JSONPlaceholder.getData(null, strAnnee).subscribe((data) => {
        birth.push(data['records'][0]["fields"]["garcons"]);
        birth.push(data['records'][0]["fields"]["filles"]);
        console.log(birth);
      })
      if (this.LineChart !== null){
        console.log(birth);
        this.LineChart.destroy();
        this.displayPieChart(birth[0],birth[1], this._currentYears[0]);
      }
      else{
        console.log("Goes here else");
        this.displayPieChart(birth[0],birth[1], this._currentYears[0]);
      }
    }
    else{
      let year = [];
      let birth_boy = [];
      let birth_girl = [];
      var strAnnee;
      var debutAnnee = this._currentYears[0];
      var finAnnee = this._currentYears[1];
      var i;
      for (i = debutAnnee; i < finAnnee; i++){
        strAnnee = i.toString()
        this.JSONPlaceholder.getData(null, strAnnee).subscribe((data) => {
          
          birth_boy.push(data['records'][0]["fields"]["garcons"]);
          birth_girl.push(data['records'][0]["fields"]["filles"])
        })
        year.push(i);
      }
      if (this.LineChart !== null){
        this.LineChart.destroy();
        this.displayCharts(birth_boy,birth_girl, year);
      }
      else{
        this.displayCharts(birth_boy,birth_girl, year);
      }
    }
    
  }


  displayCharts(birth_boy : number[], birth_girl : number[], year : number[]){
    var content;
    var valueCb = this.checkBoxContent();
    console.log(valueCb);
    switch (valueCb) {
      case 0:
        content = [{
              label : "Naissance garcons depuis "+ this._currentYears[0].toString() + " à " + this._currentYears[1].toString(),
              data: birth_boy,
              borderColor: '#3cba9f',
              fill: false
            },
          {
              label : "Naissance filles depuis "+this._currentYears[0].toString() + " à " + this._currentYears[1].toString(),
              data:birth_girl,
              borderColor: '#ffcc00',
              fill: false
            }
        ];
        break;
      case 1:
        content = [{
          label : "Naissance garcons depuis "+ this._currentYears[0].toString() + " à " + this._currentYears[1].toString(),
          data: birth_boy,
          borderColor: '#3cba9f',
          fill: false
        }]
        break;
        case 2:
          content = [{
            label : "Naissance filles depuis "+this._currentYears[0].toString() + " à " + this._currentYears[1].toString(),
            data:birth_girl,
            borderColor: '#ffcc00',
            fill: false
          }]
          break;
      default:
        break;
    }
    this.LineChart = new Chart('canvas',{
      type : 'line',
      data: {
        labels: year,
        datasets: content
      },
      options: {
        legend: {
          text: "Line Chart",
          display: true,
          maintainAspectRatio: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true,
            tick:{
              beginAtZero : false                           
            }
          }]
        }
      }
    })
  }
  displayPieChart(birth_boy : number[],birth_girl : number[],  year : number){
    console.log(birth_girl, birth_boy),
    this.LineChart = new Chart('canvas',{
      type: 'pie',
			data: {
				datasets: [{
					data: [birth_boy, birth_girl],
					label: 'Dataset 1'
				}],
				labels: [
					'Red',
					'Orange',
				]
			},
			options: {
        responsive : true,
        legend: {
          text: "Line Chart",
          display: true,
          maintainAspectRatio: false
        }}
    })
  }
  
checkBoxContent(){
  let checkBoxBoys = (<HTMLInputElement>document.getElementById("keeplog")).checked;
  let checkBoxGirls = (<HTMLInputElement>document.getElementById("keeplog2")).checked;
  if (checkBoxGirls == true && checkBoxBoys == true)
    return 0;
  if(checkBoxBoys == true)
    return 1;
  if (checkBoxGirls == true)
    return 2
  return 0;
  }

onSliderChange(selectedValues: number[]) {
    this._currentYears = selectedValues;
}
  
}
