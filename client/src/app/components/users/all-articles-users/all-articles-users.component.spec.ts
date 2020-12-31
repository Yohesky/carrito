import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllArticlesUsersComponent } from './all-articles-users.component';

describe('AllArticlesUsersComponent', () => {
  let component: AllArticlesUsersComponent;
  let fixture: ComponentFixture<AllArticlesUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllArticlesUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllArticlesUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
