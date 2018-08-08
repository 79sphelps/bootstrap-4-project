import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePersonComponent } from './delete-person.component';

describe('DeletePersonComponent', () => {
  let component: DeletePersonComponent;
  let fixture: ComponentFixture<DeletePersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
