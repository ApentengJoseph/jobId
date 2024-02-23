import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss'],
})
export class CandidateComponent implements OnInit {
  constructor() {}

  candidates = [
    { id: 'JB78956', name: 'John Scarlet', role: 'Finance Specialist', rating: 4.0, addedDaysAgo: 3 },
    { id: 'AB12345', name: 'Jane Doe', role: 'Data Analyst', rating: 4.5, addedDaysAgo: 5 },
    { id: 'CD67890', name: 'Steve Smith', role: 'Project Manager', rating: 3.8, addedDaysAgo: 10 },
    // ... other candidates
  ];

  ngOnInit() {}
}
