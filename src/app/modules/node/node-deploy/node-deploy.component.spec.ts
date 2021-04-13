import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeDeployComponent } from './node-deploy.component';

describe('NodeDeployComponent', () => {
  let component: NodeDeployComponent;
  let fixture: ComponentFixture<NodeDeployComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeDeployComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeDeployComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
