import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { BlockchainService } from 'src/app/services/blockchain.service';
import { Peer } from 'src/app/services/config.service';
import { ConfigtxService } from 'src/app/services/configtx.service';

interface Channel {
  value: string;
  viewValue: string;
}

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {



  channels: Channel[] = [];
  peers:Peer[]=[];

  canShowSelection = false;


  isWaiting:boolean = false;
  constructor(private configtxService:ConfigtxService,private blockchainService:BlockchainService) { 
    this.channels.push({
      value:this.configtxService.getChannelName(),
      viewValue:this.configtxService.getChannelName()
    })
    this.peers = this.configtxService.getPeersInChannel();
    if(this.peers.length != 0){
      this.canShowSelection = true;
    }else{
      this.canShowSelection = false;
    }
  }



  ngOnInit(): void {
  }


  onCreateChannel(){
    this.isWaiting = true;
    this.blockchainService.createChannel({
      Name:this.configtxService.getChannelName()
    }).subscribe(
      (response:any)=>{
        this.isWaiting = false;
        alert(response.Payload);
    })
  }

  onJoin(peer){
    var pars = peer.HostName.split(".");
    var peerInfo = {
      HostName:peer.HostName,
      Org:pars[1],
      Port:peer.Port.toString(),
      Channel:this.configtxService.getChannelName()
    }
    this.blockchainService.joinChannel(peerInfo).subscribe(
      (response:any)=>{
        alert(response.Payload)
      }
    )
  }
  onBecome(peer:Peer){
    var pars = peer.HostName.split(".");
    var peerInfo = {
      HostName:peer.HostName,
      Org:pars[1],
      Port:peer.Port.toString(),
      Channel:this.configtxService.getChannelName()
    }
    this.blockchainService.updateAnchorPeers(peerInfo).subscribe(
      (response:any)=>{
        alert(response.Payload)
      }
    )
  }
}
