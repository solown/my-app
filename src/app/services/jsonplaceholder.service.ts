import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JSONPlaceholderService {

  constructor(private http: HttpClient) { }
  getData(sexe: number, anneeDebut: string, anneeFin: string):Observable<any>{
    if (anneeFin==null){
      anneeFin = "2020"
    } 
    const url="https://data.rennesmetropole.fr/api/records/1.0/search//?dataset=naissances-a-rennes";
    return this.http.get<any>(url);
  }
}
