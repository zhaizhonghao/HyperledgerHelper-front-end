import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  sideBarToggler(){
    console.log(this.sideBarOpen)
    this.sideBarOpen = !this.sideBarOpen;
  }

}
