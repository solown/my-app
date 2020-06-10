import { Component, OnInit } from '@angular/core';
/* Import du module Chart.js pour la création de rapports */
import {Chart} from 'chart.js';
/* Import du module contenant le client HTTP vers l'API */
import { JSONPlaceholderService } from '../services/jsonplaceholder.service';

/* Ajout du styles et du code html lié au Component */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  /* Variable global pour la gestion des éléments propres aux html*/
  _currentYears = [];
  myModel : any;
  LineChart = null;
  /* Création de l'objet JSONPlaceholder pour réaliser la requête */
  constructor(private JSONPlaceholder:JSONPlaceholderService){}

  ngOnInit(){ }

  
  getDataFromApi(){
  /**
   * Récupère les éléments nécessaires liés à l'API et fait appel aux fonctions d'affichage des graphes
  */
    // Si les deux années de la Slide bar sont égales, on affiche un camembert pour la répartition filles, garçons
    if (this._currentYears[0]==this._currentYears[1]){
      let birth = [];
      strAnnee = this._currentYears[0].toString()
      // Appel API - Méthode subscribe pour attendre la réception des données avant appel du grapĥique
      this.JSONPlaceholder.getData(null, strAnnee).subscribe((data) => {
        birth.push(data['records'][0]["fields"]["garcons"]);
        birth.push(data['records'][0]["fields"]["filles"]);
        if (this.LineChart !== null){
          //Si un graphique existe déjà on le supprime avant de le recréer
          this.LineChart.destroy();
          this.displayPieChart(birth[0],birth[1], this._currentYears[0]);
        }
        else{
          this.displayPieChart(birth[0],birth[1], this._currentYears[0]);
        }
      })
      
    }//Sinon on affiche l'évolution des naissances par années
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

  /**
   * Affiche un graphique linéaire (Line Chart) avec les données passés en paramètres
   * @param birth_boy 
   * @param birth_girl 
   * @param year 
   */
  displayCharts(birth_boy : number[], birth_girl : number[], year : number[]){
    var content;
    var valueCb = this.checkBoxContent();
    // Prépare les valeurs pour les filles, les garçons ou les deux, en fonction des checkboxes
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
    // Création du graph dans la variable LineChart - Intégration de la partie contente initialisé dans le switch
    this.LineChart = new Chart('canvas',{
      type : 'line',
      data: {
        labels: year,
        datasets: content,
      },
      options: {
        responsive : true,
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
  /**
   * Affiche un camembert statistique (pie chart)
   * @param birth_boy 
   * @param birth_girl 
   * @param year 
   */
  displayPieChart(birth_boy : number[],birth_girl : number[],  year : number){
    this.uncheckBoxes();
    this.LineChart = new Chart('canvas',{
      type: 'pie',
			data: {
				datasets: [{
          data: [birth_boy, birth_girl],
          backgroundColor: [
            "#3cba9f",
            "#ffcc00"],
					label: 'Dataset 1'
				}],
				labels: [
					'Nombres de filles nées en '+year,
					'Nombres de garcons nés en '+year,
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
/**
 * Retourne la valeur des checkbox afin de déterminer lesquelles sont cochées.
 */
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

  /**
   * Met à jour la valeur de la slide bar dans la variable _currentYears
   * @param selectedValues 
   */
  onSliderChange(selectedValues: number[]) {
      this._currentYears = selectedValues;
  }

  uncheckBoxes(){
    (<HTMLInputElement>document.getElementById("keeplog")).checked = false;
    (<HTMLInputElement>document.getElementById("keeplog2")).checked = false;
  }
}
