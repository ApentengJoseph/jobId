import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsignComponent } from './jobsign.component';

describe('JobsignComponent', () => {
  let component: JobsignComponent;
  let fixture: ComponentFixture<JobsignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsignComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JobsignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
