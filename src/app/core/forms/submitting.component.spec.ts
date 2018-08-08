import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittingComponent } from './submitting.component';

describe('SubmittingComponent', () => {
  let component: SubmittingComponent;
  let fixture: ComponentFixture<SubmittingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmittingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
