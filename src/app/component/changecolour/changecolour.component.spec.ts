import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangecolourComponent } from './changecolour.component';

describe('ChangecolourComponent', () => {
  let component: ChangecolourComponent;
  let fixture: ComponentFixture<ChangecolourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangecolourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangecolourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
