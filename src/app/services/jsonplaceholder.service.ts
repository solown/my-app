/* Import des modules pour les requêtes HTTP */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
/* Observable permet de suivre la modification d'une valeur */
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JSONPlaceholderService {
  // Constructeur du client http permettant d'envoyer la requête
  constructor(private http: HttpClient) { }
  /**
   * Envoie une requête préparé à l'API RennesMetropoles
   * @param {String} sexe 
   * @param {String} annee
   * @return {Json} 
   */
  getData(sexe: string, annee : string):Observable<any>{
    var param;
    param = "&facet=garcons&facet=filles&facet=indetermine"
    if (annee != null){
      // On filtre sur l'année récupérée
      param = param + "&refine.annee="+annee
    }
    // API Endpoint par défaut
    const baseUrl="https://data.rennesmetropole.fr/api/records/1.0/search//?dataset=naissances-a-rennes&lang=fr&rows=50&";
    return this.http.get<any>(baseUrl+param);
  }
}
