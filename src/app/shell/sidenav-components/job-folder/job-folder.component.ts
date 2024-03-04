import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, LocationStrategy } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-job-folder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-folder.component.html',
  styleUrls: ['./job-folder.component.scss'],
})
export class JobFolderComponent implements OnInit {
  files = [
    {
      fileName: 'Crimson files',
      numberOfFiles: '44',
    },
    {
      fileName: 'JP Kent',
      numberOfFiles: '44',
    },
    {
      fileName: 'Contract',
      numberOfFiles: '44',
    },
    {
      fileName: 'Crimson files',
      numberOfFiles: '44',
    },
    {
      fileName: 'JP Kent',
      numberOfFiles: '44',
    },
    {
      fileName: 'Contract',
      numberOfFiles: '44',
    },
    {
      fileName: 'Crimson files',
      numberOfFiles: '44',
    },
    {
      fileName: 'JP Kent',
      numberOfFiles: '44',
    },
    {
      fileName: 'Contract',
      numberOfFiles: '44',
    },
    {
      fileName: 'Crimson files',
      numberOfFiles: '44',
    },
    {
      fileName: 'JP Kent',
      numberOfFiles: '44',
    },
    {
      fileName: 'Contract',
      numberOfFiles: '44',
    },
  ];
  folderFile = [
    {
      img: '',
      header: 'Resume.doc',
      subText: 'thu 6th, November 188 KB',
      time: '3:00 PM',
    },
    {
      img: '',
      header: 'Resume.doc',
      subText: 'thu 6th, November 188 KB',
      time: '3:00 PM',
    },
    {
      img: '',
      header: 'Resume.doc',
      subText: 'thu 6th, November 188 KB',
      time: '3:00 PM',
    },
  ];
  openOptions: boolean = false;
  openedFile: boolean = false;
  selectedTab: number = 0;
  showFile: boolean = false;

  constructor(public dialogRef: MatDialogRef<JobFolderComponent>) {}

  ngOnInit(): void {}
  selectTab(index: number) {
    this.selectedTab = index;
  }
  open() {
    this.openOptions = !this.openOptions;
  }
  openFile() {
    this.openedFile = !this.openedFile;
    this.dialogRef.updateSize('946px', '100vh');
  }
  back() {
    this.openedFile = false;
    this.dialogRef.updateSize('370px', '100vh');
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
