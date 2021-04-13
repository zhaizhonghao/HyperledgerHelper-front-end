import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExplorerService {
  private url : string;
  private httpOptions : any;
  constructor( private httpClient:HttpClient) { 
    this.url = 'http://localhost:8282';
    this.httpOptions= {
      headers: new HttpHeaders({
         'Content-Type':  'application/json'
       })
     };
  }


  setupExplorer(body){
    return this.httpClient.post(this.appendToUrl('display','explorer'),body,this.httpOptions);
   }
  

  private appendToUrl(...args){
    let urlFull = this.url;
    for (let i = 0; i < args.length; i++) {
      urlFull = urlFull + '/' + args[i];
    }
    return urlFull;
 }

}
