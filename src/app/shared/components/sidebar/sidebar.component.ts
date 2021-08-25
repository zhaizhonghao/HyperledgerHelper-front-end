import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';



/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  type :string;
  icon:string;
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    type:'identiy',
    name: 'Identity Management',
    icon:'account_box',
    children: [
      {type:'identity',icon:'person_add_alt_1',name: 'Register'},
      {type:'identity',icon:'self_improvement',name: 'Update'},
      {type:'identity',icon:'person_remove',name: 'Revoke'},
    ]
  },
  {
    type:'channel',
    name: 'Channel Management',
    icon:'view_comfy',
    children: [
      {type:'channel',icon:'add_road',name: 'Create'},
      {type:'channel',icon:'wrap_text',name: 'Join'},
    ]
  },
  {
    type:'node',
    name: 'Node Management',
    icon:'workspaces',
    children: [
      {type:'node',icon:'connect_without_contact',name: 'Deploy'},
      {type:'node',icon:'follow_the_signs',name: 'Leave'},
    ]
  },
  {
    type:'contract',
    name: 'Smart Contract Management',
    icon:'developer_board',
    children: [
      {type:'contract',icon:'cloud_circle',name: 'Install'},
      {type:'contract',icon:'gavel',name: 'Approve'},
      {type:'contract',icon:'cloud_done',name: 'Instantiate'},
      {type:'contract',icon:'cloud_upload',name: 'Upgrade'},
    ]
  },
  {
    type:'migration',
    name: 'DApp Migration',
    icon:'swipe',
    children: [
      {type:'migration',icon:'queue',name: 'Migrate'},
      {type:'migration',icon:'play_circle_filled',name: 'Invoke'},
    ]
  },
  {
    type:'display',
    name: 'Blockchain Display',
    icon:'personal_video',
    children: [
      {type:'display',icon:'timeline',name: 'Explorer'},
    ]
  }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  panelOpenState = false;
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      type:node.type,
      icon:node.icon,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }
  ngOnInit(): void {
    
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

}
