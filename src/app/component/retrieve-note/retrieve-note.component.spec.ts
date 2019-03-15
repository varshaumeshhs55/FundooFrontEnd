import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrieveNoteComponent } from './retrieve-note.component';

describe('RetrieveNoteComponent', () => {
  let component: RetrieveNoteComponent;
  let fixture: ComponentFixture<RetrieveNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetrieveNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetrieveNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
