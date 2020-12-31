import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverSellerComponent } from './recover-seller.component';

describe('RecoverSellerComponent', () => {
  let component: RecoverSellerComponent;
  let fixture: ComponentFixture<RecoverSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoverSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
