import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageFormComponent } from './homepage-form.component';

describe('HomepageFormComponent', () => {
  let component: HomepageFormComponent;
  let fixture: ComponentFixture<HomepageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
