import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-job-dialog',
  templateUrl: './dialog-job-form.component.html',
  styleUrls: ['./dialog-job-form.component.scss'],
})
export class CreateJobDialogComponent {
  constructor(public dialogRef: MatDialogRef<CreateJobDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
