import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleSignUpComponent } from './people-sign-up.component';

describe('PeopleSignUpComponent', () => {
  let component: PeopleSignUpComponent;
  let fixture: ComponentFixture<PeopleSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleSignUpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PeopleSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
