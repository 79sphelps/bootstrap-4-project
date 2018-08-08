import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonelNewComponent } from './personel-new.component';

describe('PersonelNewComponent', () => {
  let component: PersonelNewComponent;
  let fixture: ComponentFixture<PersonelNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonelNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonelNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
