import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service';
import { ConfigService } from 'src/app/services/config.service';




@Component({
  selector: 'app-node-deploy',
  templateUrl: './node-deploy.component.html',
  styleUrls: ['./node-deploy.component.scss']
})
export class NodeDeployComponent implements OnInit {

  orderers = [];
  peers = [];
  isWaiting = false;

  constructor(private configService:ConfigService,private blockchainService:BlockchainService) { 
    
    this.orderers = this.configService.getOrdererList();
    this.peers = this.configService.getPeerList();
    console.log(this.orderers)
    console.log(this.peers)
  }

  ngOnInit(): void {
  }



  onDeploy(){
    this.isWaiting = true;
    this.blockchainService.deployNode().subscribe(
      (response:any)=>{
        this.isWaiting = false;
        console.log(response);
        alert(response.Message)
    })
  }
}
