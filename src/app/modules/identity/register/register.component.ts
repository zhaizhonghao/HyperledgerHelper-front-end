import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { BlockchainService } from 'src/app/services/blockchain.service';
import { ConfigService } from 'src/app/services/config.service';
import { ConfigCp, OrdererCp, PeerOrgCp } from './configCp.model';

export interface Node {
  name: string;
  port: number;
}

export interface User{
  name:string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  orderers = [];
  peerOrgs = [];
  counterOfOrderers = 0;
  counterOfPeerOrgs = 0;
  error = null;
  isGenerating = false;
  isGenerated = false;
  generatedOrderers : Node[] = [];
  generatedPeers : Node[]= [];
  generatedUsers :User[] = [];


  constructor(private blockchainService:BlockchainService,private configService:ConfigService) { 

  }

  ngOnInit(): void {

  }

  onAddOrderer(){
    this.counterOfOrderers ++ ;
    this.orderers.push(this.counterOfOrderers);
  }

  onRemoveOrderer(orderer){
    for (let i = 0; i < this.orderers.length; i++) {
      const item = this.orderers[i];
      if (item === orderer) {
        this.orderers.splice(i,1)
      }
    }
  }

  onAddPeerOrg(){
    this.counterOfPeerOrgs ++ ;
    this.peerOrgs.push(this.counterOfPeerOrgs);
  }

  onRemovePeerOrg(peerOrg){
    for (let i = 0; i < this.peerOrgs.length; i++) {
      const item = this.peerOrgs[i];
      if (item === peerOrg) {
        this.peerOrgs.splice(i,1)
      }
    }
  }

  onSubmit(f:NgForm){
    var configCp = this.handleForm(f.form.value.ConfigCp);
    this.configService.setConfig(configCp);
    this.isGenerating = true;
    this.blockchainService.postConfigCp(JSON.stringify(configCp))
    .subscribe(
      (response:any)=>{
        if(response == null){
          alert("There is no response!")
          this.isGenerating = false;
          return
        }
        this.handleResponse(response);
        this.isGenerating = false;
        this.isGenerated = true;
        alert("Generate the identity materails succefully!")
      },
      error =>{
        this.error = error.message;
        this.isGenerating = false;
      }
    )
  }
  
  onClick(f:NgForm){
    f.reset();
  }

  handleForm(value){
    //Abstract the info of the orderer
    var ordererCps:OrdererCp[] = [];
    var peerOrgCps:PeerOrgCp[] = [];
    for (let i = 0; i < this.orderers.length; i++) {
      const element = this.orderers[i];
      var key = 'HostName' + element;
      ordererCps.push({
          HostName:value.OrdererCps[key]
        })
    }
    //Abstract the info of the peer
    for (let i = 0; i < this.peerOrgs.length; i++) {
      const element = this.peerOrgs[i];
      var PeerOrgCp = 'PeerOrgCp'+element;
      var Name = 'Name'+element;
      var Domain = 'Domain'+element;
      var CountOfPeers = 'CountOfPeers' + element;
      var CountOfUsers = 'CountOfUsers' + element;
      peerOrgCps.push({
        Name : value.PeerOrgCps[PeerOrgCp][Name],
        Domain : value.PeerOrgCps[PeerOrgCp][Domain],
        CountOfPeers : value.PeerOrgCps[PeerOrgCp][CountOfPeers],
        CountOfUsers : value.PeerOrgCps[PeerOrgCp][CountOfUsers],
        })
    }
    var configCp:ConfigCp = {
        OrdererCps:ordererCps,
        PeerOrgCps:peerOrgCps
      };
    return configCp;
  }

  onClearError(){
    this.error = null;
  }

  handleResponse(response){
    for (let i = 0; i < response.OrdererCps.length; i++) {
      const orderer = response.OrdererCps[i];
      this.generatedOrderers.push({
        name:orderer.HostName,
        port: (7+i)*1000+50
      })
    }
    for (let i = 0; i < response.PeerOrgCps.length; i++) {
      const peer = response.PeerOrgCps[i];
      for (let j = 0; j < response.PeerOrgCps[i].CountOfPeers; j++) {
        this.generatedPeers.push({
          name:'peer'+j+"."+peer.Domain,
          port: (7+i*response.PeerOrgCps[i].CountOfPeers+j)*1000+51
        })     
      }
      this.generatedUsers.push({
        name:'Admin'+"@"+peer.Domain
      })  
      for (let j = 0; j < response.PeerOrgCps[i].CountOfUsers; j++) {
        this.generatedUsers.push({
          name:'User'+(j+1)+"@"+peer.Domain
        })     
      }
    }
  }
}
