import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesPaneComponent } from './messages-pane.component';

describe('MessagesPaneComponent', () => {
  let component: MessagesPaneComponent;
  let fixture: ComponentFixture<MessagesPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
