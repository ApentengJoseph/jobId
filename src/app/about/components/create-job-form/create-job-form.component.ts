import { CdkStepper } from '@angular/cdk/stepper';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

interface DropdownOption {
  text: string;
  icon: string;
  value: any;
}

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

  keywords: string[] = [
    'Ad Hoc Analysis',
    'Annual Budgeting',
    'Financial Planning',
    'Financial Planning',
    'Financial Planning',
  ];

  removeKeyword(keyword: string): void {
    this.keywords = this.keywords.filter((k) => k !== keyword);
  }

  addKeyword(): void {
    // Logic to add a new keyword
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

  public isOpen = false;
  public selectedOption = { value: 'placeholder', label: 'Select job role', icon: '⬇️' }; // Placeholder icon

  public options = [
    { value: 'accountant', label: 'Accountant', icon: '🔥' },
    { value: 'finance-specialist', label: 'Finance Specialist', icon: '🌟' },
    { value: 'finance-manager', label: 'Finance Manager', icon: '🍀' },
    { value: 'chief-financial-officer', label: 'Chief financial officer', icon: '🍀' },
  ];

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: { value: string; label: string; icon: string }) {
    this.selectedOption = option;
    this.toggleDropdown();
  }
}
