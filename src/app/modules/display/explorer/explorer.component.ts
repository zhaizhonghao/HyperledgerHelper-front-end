import { Component, OnInit } from '@angular/core';
import { ConfigtxService } from 'src/app/services/configtx.service';
import { ExplorerService } from 'src/app/services/explorer.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {

  constructor(private configtxService:ConfigtxService,private explorerService:ExplorerService) { }

  ngOnInit(): void {
  }

  isStarted = false;

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

}
