import { Injectable } from '@angular/core';
import { Configtx } from '../modules/channel/create/configtx.model';
import { ConfigService, Peer } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigtxService {

  private configtx:Configtx;

  constructor(private configService:ConfigService) { }

  setConfigtx(configtx){
    this.configtx = configtx;
  }

  getChannelName(){
    if(this.configtx == null){
      return null
    }
    return this.configtx.Channel.Name;
  }

  getPeersInChannel(){
    if(this.configtx == null){
      return [];
    }
    var peers = this.configService.getPeerList();
    var peersInChannel:Peer[] = []
    for (let i = 0; i < this.configtx.Channel.Organizatioins.length; i++) {
      const organization = this.configtx.Channel.Organizatioins[i];
      for (let j = 0; j < peers.length; j++) {
        const peer = peers[j];
        if (peer.HostName.indexOf('.'+organization.Name.toLowerCase()+'.') != -1) {
          peersInChannel.push(peer);
        }
      }
    }
    return peersInChannel;
  }

  getOrgsInChannel(){
    if(this.configtx == null){
      return [];
    }
    var orgs = [];
    for (let i = 0; i < this.configtx.Channel.Organizatioins.length; i++) {
      const organization = this.configtx.Channel.Organizatioins[i];
      orgs.push(organization.Name);
    }
    return orgs;
  }
}
