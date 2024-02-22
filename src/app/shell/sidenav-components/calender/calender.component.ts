import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
})
export class CalenderComponent implements OnInit {
  users = [
    { image: 'assets/images/avatar.png' },
    { image: 'assets/images/avatar.png' },
    { image: 'assets/images/avatar.png' },
    { image: 'assets/images/avatar.png' },
    { image: 'assets/images/avatar.png' },
    { image: 'assets/images/avatar.png' },
  ];
  constructor(public dialogRef: MatDialogRef<CalenderComponent>) {}

  ngOnInit(): void {}
  closeDialog() {
    this.dialogRef.close();
  }
}
