import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpreviewComponent } from './carpreview.component';

describe('CarpreviewComponent', () => {
  let component: CarpreviewComponent;
  let fixture: ComponentFixture<CarpreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarpreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
