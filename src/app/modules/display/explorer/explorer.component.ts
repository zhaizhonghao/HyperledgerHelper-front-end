import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BlockchainService } from 'src/app/services/blockchain.service';
import { ConfigtxService } from 'src/app/services/configtx.service';
import { ExplorerService } from 'src/app/services/explorer.service';
import {Node} from '../../node/node-deploy/node.model'

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit,OnDestroy {
  interval;
  constructor(private blockchainService:BlockchainService,private configtxService:ConfigtxService,private explorerService:ExplorerService) {
    this.dataSource.data.push({
      name:"explorer.mynetwork.com",
      state:false
    })
    this.dataSource.data.push({
      name:"explorerdb.mynetwork.com",
      state:false
    })
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  ngOnInit(): void {
    this.interval = setInterval(this.getLatestState,1000,this.blockchainService,this.dataSource);
  }

  isStarted = false;
  dataSource = new MatTableDataSource<Node>();
  displayedColumns: string[] = ['state','name','operation'];
  onStart(){
    // var channel = {
    //   ChannelName : this.configtxService.getChannelName().toLowerCase()
    // }
    var channel = {
      ChannelName : "basicchannel"
    }
    this.isStarted = true;
    console.log(channel)
    this.explorerService.setupExplorer(channel).subscribe(
      (response:any)=>{
        alert(response.Payload)
      }
    )
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

}
