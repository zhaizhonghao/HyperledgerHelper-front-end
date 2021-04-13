import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApproveInfoService } from 'src/app/services/approve-info.service';
import { BlockchainService } from 'src/app/services/blockchain.service';
import { ConfigtxService } from 'src/app/services/configtx.service';

@Component({
  selector: 'app-install',
  templateUrl: './install.component.html',
  styleUrls: ['./install.component.scss']
})
export class InstallComponent implements OnInit {


  @ViewChild('f',{static:false}) form:NgForm;
  languages = [
    {value:'java',viewValue:'java'},
    {value:'python',viewValue:'python'},
    {value:'javascript',viewValue:'javascript'},
    {value:'golang',viewValue:'golang'}
  ]

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

  contractInfo;



  constructor(
    private configtxService:ConfigtxService,
    private blockchainService:BlockchainService,
    private approveInfoService:ApproveInfoService) {
    this.peers = this.configtxService.getPeersInChannel();

  }

  ngOnInit(): void {
  }



  onPackage(peer){
    var parts = peer.HostName.split('.')
    var peerInfo = {
      Org:parts[1],
      Port:peer.Port.toString(),
      Channel:this.form.value.Channel
    }
    var contractInfo = {
      PeerInfo:peerInfo,
      Language:this.form.value.Language,
      Version:this.form.value.Version.toString(),
      ContractName:this.form.value.ContractName
    }
    this.blockchainService.packageContract(contractInfo).subscribe(
      (response:any)=>{
        alert(response.Payload);
      }
    )
  }

  onInstall(peer){
    var parts = peer.HostName.split('.')
    var peerInfo = {
      Org:parts[1],
      Port:peer.Port.toString(),
      Channel:this.form.value.Channel
    }
    var contractInfo = {
      PeerInfo:peerInfo,
      Language:this.form.value.Language,
      Version:this.form.value.Version.toString(),
      ContractName:this.form.value.ContractName
    }
    this.contractInfo = contractInfo;
    this.blockchainService.installContract(contractInfo).subscribe(
      (response:any)=>{
        if(response == null){
          console.log("install failed")
        }
        alert(response.Payload);
        //this.packageID = response.Payload;
        var approveInfo = {
          ContractInfo:contractInfo,
          PackageID:response.Payload
        }
        //Emit the event
        //this.approveInfoService.installEvent.next(approveInfo);
        this.approveInfoService.setApproveInfo(approveInfo);
      }
    )
  }

  onQueryPackageID(){
    this.blockchainService.fetchPackegeID().subscribe(
      (response:any)=>{
        alert(response.Payload)
        var approveInfo = {
          ContractInfo:this.contractInfo,
          PackageID:response.Payload
        }
        //Emit the event
        //this.approveInfoService.installEvent.next(approveInfo);
        this.approveInfoService.setApproveInfo(approveInfo);
      }
    )
  }

}
