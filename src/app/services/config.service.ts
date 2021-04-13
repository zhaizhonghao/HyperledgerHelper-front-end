import { Injectable } from '@angular/core';
import { AnchorPeer, Orderer, Organization } from '../modules/channel/create/configtx.model';
import { ConfigCp } from '../modules/identity/register/configCp.model';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private config:ConfigCp;
  constructor() { 

  }

  setConfig(config:ConfigCp){
    this.config = config;
  }

  getOrganizations(){
    var organizations:Organization[]=[];
    if(this.config == null){
      return organizations;
    }
    var counterOfPeers = 0;
    for (let i = 0; i < this.config.PeerOrgCps.length; i++) {
      const peerOrg = this.config.PeerOrgCps[i];
      var name = peerOrg.Name;
      var anchorPeer:AnchorPeer = {
        Host:'peer0.'+name.toLowerCase()+'.example.com',
        Port:(7+counterOfPeers)*1000+51
      }
      counterOfPeers = counterOfPeers+peerOrg.CountOfPeers;
      organizations.push({
        Name:name,
        AnchorPeer:anchorPeer
      })
    }
    return organizations;
  }

  getOrderers(){
    var orderers:Orderer[] = [];
    if(this.config == null){
      return orderers;
    }
    for (let i = 0; i < this.config.OrdererCps.length; i++) {
      const ordererCp = this.config.OrdererCps[i];
      var orderer:Orderer = {
        Host:ordererCp.HostName,
        Port: (7+i)*1000+50
      }
      orderers.push(orderer);
    }
    return orderers;
  }

  getOrdererList(){
    if(this.config == null){
      return [];
    }
    return this.getOrderers();
  }

  getPeerList(){
    if(this.config == null){
      return [];
    }
    var peerList = [];
    var counter = 0;
    for (let i = 0; i < this.config.PeerOrgCps.length; i++) {
      const peerOrg = this.config.PeerOrgCps[i];
      var orgName = peerOrg.Name.toLowerCase();
      for (let j = 0; j < peerOrg.CountOfPeers; j++) {
        var peer = {
          HostName:"peer"+j+"."+orgName+".example.com",
          Port: (7+counter)*1000+51
        }
        peerList.push(peer);
        counter++;
      }
    }
    return peerList;
  }




}
