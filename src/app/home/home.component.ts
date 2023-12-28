import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';

interface Appointment {
  date: Date;
  time: string;
  person: string;
  role: string;
}

interface Metric {
  title: string;
  value: number;
  change: number;
  increase: boolean;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  cardData = {
    title: 'Front end developer',
    postedTime: '2 days ago',
    stats: [
      { label: 'Applicant', value: 125 },
      { label: 'Shortlist', value: 25 },
      { label: 'Interview', value: 5 },
      { label: 'Offer', value: 0 },
      { label: 'Hired', value: 0 },
    ],
  };
  @Input() score: number = 75; // Default score value
  metrics: Metric[] = [
    { title: 'Total job posting', value: 505, change: 0.2, increase: true },
    { title: 'Total hired', value: 197, change: -0.1, increase: false },
    { title: 'Total applicant', value: 14720, change: -0.02, increase: false },
  ];
  viewAll: boolean = true;

  setView(all: boolean): void {
    this.viewAll = all;
  }
  dayLabel = 'Tomorrow';
  appointmentDate = new Date('2021-02-28');
  appointmentTime = new Date('2021-02-28T08:00:00');
  userName = 'Floyd Miles';
  userRole = 'UI/UX Designer';
  appointments: Appointment[] = [
    {
      date: new Date('2021-02-28'), // The date of the appointment
      time: '8:00 AM', // The time of the appointment
      person: 'Floyd Miles', // The name of the person
      role: 'UI/UX Designer', // The role or purpose of the appointment
    },
    {
      date: new Date('2021-02-28'),
      time: '9:00 AM',
      person: 'Dianne R.',
      role: 'Marketing Specialist',
    },
    // ... other appointments
  ];
  constructor(private quoteService: QuoteService) {}

  ngOnInit() {
    this.isLoading = true;
    this.quoteService
      .getRandomQuote({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: string) => {
        this.quote = quote;
      });
  }
}
