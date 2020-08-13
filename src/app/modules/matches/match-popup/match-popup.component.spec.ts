import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPopupComponent } from './match-popup.component';

describe('MatchPopupComponent', () => {
  let component: MatchPopupComponent;
  let fixture: ComponentFixture<MatchPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
