import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss'],
})
export class RecruitmentComponent implements OnInit {
  currentDate = new Date();
  months: string[];
  years!: number[];
  selectedYear: number;
  selectedMonth: string;

  constructor() {
    this.months = this.getMonths();
    // Assuming you want a range of 5 years for the example
    this.years = this.getYears(this.currentDate.getFullYear() - 2, 5);
    this.selectedYear = this.currentDate.getFullYear();
    this.selectedMonth = this.months[this.currentDate.getMonth()];
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getMonths(): string[] {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }

  getYears(startYear: number, range: number): number[] {
    return Array.from({ length: range }, (v, i) => startYear + i);
  }

  selectYear(year: number) {
    this.selectedYear = year;
  }

  selectMonth(month: string) {
    this.selectedMonth = month;
  }

  changeYear(direction: number) {
    this.selectedYear += direction;
    // Adjust the years array if the selected year is at the end or the beginning
    if (this.selectedYear > this.years[this.years.length - 1]) {
      this.years.push(this.selectedYear);
      this.years.shift();
    } else if (this.selectedYear < this.years[0]) {
      this.years.unshift(this.selectedYear);
      this.years.pop();
    }
  }
}
