import { CdkStepper } from '@angular/cdk/stepper';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-create-job-form',
  templateUrl: './create-job-form.component.html',
  styleUrls: ['./create-job-form.component.scss'],
})
export class CreateJobFormComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    console.log(this.stepper);
  }
  @ViewChild(CdkStepper) stepper!: CdkStepper;

  steps: { label: string; active: boolean }[] = [
    { label: 'Job Info', active: true },
    { label: 'Pre-Screening Form', active: false },
    { label: 'Post Settings', active: false },
    { label: 'Team Members', active: false },
    { label: 'Progress Preview', active: false },
  ];
  ngOnInit(): void {
    //throw new Error("Method not implemented.");
  }

  selectedIndex: number = 0;

  navigateToStep(index: number): void {
    this.selectedIndex = index;
  }

  navigateToPrevious(): void {
    if (this.selectedIndex > 0) {
      this.navigateToStep(this.selectedIndex - 1);
    }
  }

  navigateToNext(): void {
    if (this.selectedIndex < this.steps.length - 1) {
      this.navigateToStep(this.selectedIndex + 1);
    }
  }

  showPreviousButton(): boolean {
    return this.selectedIndex > 0;
  }

  showNextButton(): boolean {
    return this.selectedIndex < this.steps.length - 1;
  }

  isLastStep(): boolean {
    return this.selectedIndex === this.steps.length - 1;
  }
}
