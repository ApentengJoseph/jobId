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

  ngOnInit() {}
}
