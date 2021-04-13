import { Component, OnInit } from '@angular/core';
import { ApproveInfoService } from 'src/app/services/approve-info.service';
import { BlockchainService } from 'src/app/services/blockchain.service';
import { ConfigtxService } from 'src/app/services/configtx.service';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss']
})
export class ApproveComponent implements OnInit {

  approveInfo = {
    ContractInfo:{
      ContractName:"fabcar",
      Language:"golang",
      Version:"1",
      PeerInfo:{
        Channel:"BasicChannel",
        Org:"org1",
        Port:"7051"
      }
    },
    PackageID:"fabcar_1:23df918915961296e5229590dafae0392209dd44e0072fc26b6222ab8ac08c32"
  };

  peers=[
    {
      HostName:"peer0.org1.example.com",
      Port:7051
    },
    {
      HostName:"peer1.org1.example.com",
      Port:8051
    },
  ];
  constructor(
    private approveInfoService:ApproveInfoService,
    private configtxService:ConfigtxService,
    private blockchainService:BlockchainService) { }
  ngOnInit(): void {
    // this.approveInfoService.installEvent.subscribe(
    //   (approveInfo:any)=>{
    //     this.approveInfo = approveInfo;
    //     this.approveInfoService.setApproveInfo(approveInfo);
    //     console.log(approveInfo)
    //   }
    // )
    this.approveInfo = this.approveInfoService.getApprovaInfo();
    if (this.approveInfo == null){
      console.log('approveInfo is null')
      return
    }
    this.peers = this.configtxService.getPeersInChannel();
  }

  onApprove(peer){
    var parts = peer.HostName.split('.');
    this.approveInfo.ContractInfo.PeerInfo.Org = parts[1];
    this.approveInfo.ContractInfo.PeerInfo.Port = peer.Port.toString();
    var peerInfo = {
      Org:parts[1],
      Port:peer.Port.toString(),
      Channel:this.approveInfo.ContractInfo.PeerInfo.Channel
    }
    this.approveInfoService.addApprovers(peerInfo);
    this.blockchainService.approveContract(this.approveInfo).subscribe(
      (response:any)=>{
        alert(response.Payload);
      }
    )
  }
}
