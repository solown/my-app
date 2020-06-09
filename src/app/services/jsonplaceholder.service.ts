import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JSONPlaceholderService {

  constructor(private http: HttpClient) { }
  getData(sexe: string, annee : string):Observable<any>{
    var param;
    param = "&facet=garcons&facet=filles&facet=indetermine"
    if (annee != null){
      param = param + "&refine.annee="+annee
    }
    const baseUrl="https://data.rennesmetropole.fr/api/records/1.0/search//?dataset=naissances-a-rennes&lang=fr&rows=50&";
    return this.http.get<any>(baseUrl+param);
  }
}
