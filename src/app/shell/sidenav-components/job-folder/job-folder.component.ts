import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-folder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-folder.component.html',
  styleUrls: ['./job-folder.component.scss'],
})
export class JobFolderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
