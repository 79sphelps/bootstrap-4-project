import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesUpdateComponent } from './images-update.component';

describe('ImagesUpdateComponent', () => {
  let component: ImagesUpdateComponent;
  let fixture: ComponentFixture<ImagesUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
