import { state } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BlockchainService } from 'src/app/services/blockchain.service';
import { ConfigService, Peer } from 'src/app/services/config.service';
import { Orderer } from '../../channel/create/configtx.model';
import {Node} from './node.model'




@Component({
  selector: 'app-node-deploy',
  templateUrl: './node-deploy.component.html',
  styleUrls: ['./node-deploy.component.scss']
})
export class NodeDeployComponent implements OnInit,OnDestroy {

  orderers:Orderer[] = [];
  peers:Peer[] = [];
  isWaiting = false;
  interval;
  isDeployed = false;

  dataSource = new MatTableDataSource<Node>();
  displayedColumns: string[] = ['state','name','operation'];

  constructor(private configService:ConfigService,private blockchainService:BlockchainService) { 
    
    this.orderers = this.configService.getOrdererList();
    this.peers = this.configService.getPeerList();
    for (let i = 0; i < this.orderers.length; i++) {
      const orderer = this.orderers[i];
      this.dataSource.data.push({
        name:orderer.Host+".example.com",
        state:false,
      })
    }
    for (let i = 0; i < this.peers.length; i++) {
      const peer = this.peers[i];
      this.dataSource.data.push({
        name:peer.HostName,
        state:false,
      })
    console.log(this.orderers)
    console.log(this.peers)
  }
}
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  ngOnInit(): void {

    this.interval = setInterval(this.getLatestState,1000,this.blockchainService,this.dataSource);

  }

  getLatestState(blockchainService:BlockchainService,dataSource:MatTableDataSource<Node>){
    blockchainService.getNodeStates().subscribe(
      (res:any)=>{
        for (let i = 0; i < res.length; i++) {
          const node = res[i];
          for (let j = 0; j < dataSource.data.length; j++) {
            const element = dataSource.data[j];
            if(element.name == node.name){
              element.state = true;
              console.log(element)
            }
          }
        }
      }
    )
  }



  onDeploy(){
    this.isWaiting = true;
    this.isDeployed = true;
    this.blockchainService.deployNode().subscribe(
      (response:any)=>{
        this.isWaiting = false;
        console.log(response);
        alert(response.Message)
    })
  }
}
