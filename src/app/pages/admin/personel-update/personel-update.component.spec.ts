import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonelUpdateComponent } from './personel-update.component';

describe('PersonelUpdateComponent', () => {
  let component: PersonelUpdateComponent;
  let fixture: ComponentFixture<PersonelUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonelUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonelUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
