import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-jobsign',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jobsign.component.html',
  styleUrls: ['./jobsign.component.scss'],
})
export class JobsignComponent implements OnInit {
  togglePerformed: boolean = false;
  signDetails = [
    {
      typeDocument: 'NDA document',
      date: 'Thu, 2nd Dec',
      img: 'assets/images/avatar.png',
      name: 'Abdul Jesse',
    },
    {
      typeDocument: 'NDA document',
      date: 'Thu, 2nd Dec',
      img: 'assets/images/avatar.png',
      name: 'Abdul Jesse',
    },
    {
      typeDocument: 'NDA document',
      date: 'Thu, 2nd Dec',
      img: 'assets/images/avatar.png',
      name: 'Abdul Jesse',
    },
  ];
  opnSignatureDetails: boolean = false;
  constructor(private dialogRef: MatDialogRef<JobsignComponent>) {}

  ngOnInit(): void {}
  signatureDetails() {
    if (!this.togglePerformed) {
      this.opnSignatureDetails = !this.opnSignatureDetails;
      this.dialogRef.updateSize('970px', '100vh');
      this.togglePerformed = true;
    }
  }
  addRecipient() {}
}
