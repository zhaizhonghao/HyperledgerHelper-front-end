import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  private url : string;
  private httpOptions : any;
  constructor( private httpClient:HttpClient) { 
    this.url = 'http://localhost:8181';
    this.httpOptions= {
      headers: new HttpHeaders({
         'Content-Type':  'application/json'
       })
     };
  }
  
  postConfigCp(body){
    console.log(body)
    return this.httpClient.post(this.appendToUrl('crypto'),body,this.httpOptions);
  }

  postConfigtx(body){
    return this.httpClient.post(this.appendToUrl('configtx'),body,this.httpOptions);
  }

  private appendToUrl(...args){
    let urlFull = this.url;
    for (let i = 0; i < args.length; i++) {
      urlFull = urlFull + '/' + args[i];
    }
    return urlFull;
 }

 deployNode(){
  return this.httpClient.get(this.appendToUrl('node'),this.httpOptions);
 }

 getNodeStates(){
   return this.httpClient.get(this.appendToUrl('node','states'),this.httpOptions);
 }

 createChannel(body){
  return this.httpClient.post(this.appendToUrl('channel'),body,this.httpOptions); 
 }

 joinChannel(body){
  return this.httpClient.post(this.appendToUrl('channel','join'),body,this.httpOptions); 
 }

 updateAnchorPeers(body){
  return this.httpClient.post(this.appendToUrl('channel','updateAnchorPeers'),body,this.httpOptions); 
 }

 packageContract(body){
  return this.httpClient.post(this.appendToUrl('contract','package'),body,this.httpOptions);
 }

 installContract(body){
  return this.httpClient.post(this.appendToUrl('contract','install'),body,this.httpOptions);
 }

 fetchPackegeID(){
   return this.httpClient.get(this.appendToUrl('contract','fetchPacakgeID'),this.httpOptions)
 }
 
 approveContract(body){
  return this.httpClient.post(this.appendToUrl('contract','approve'),body,this.httpOptions);
 }

 checkApprovalsOfContract(body){
  return this.httpClient.post(this.appendToUrl('contract','checkApprove'),body,this.httpOptions);
 }

 instantiateContract(body){
  return this.httpClient.post(this.appendToUrl('contract','instantiate'),body,this.httpOptions);
 }

 initializeContract(body){
  return this.httpClient.post(this.appendToUrl('contract','initialize'),body,this.httpOptions);
 }



}
