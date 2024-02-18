import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { CreateJobDialogComponent } from '../dialog-job-form/dialog-job-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss'],
})
export class JobFormComponent implements OnInit {
  version: string | null = environment.version;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateJobDialogComponent, {
      width: '450px',
      height: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
