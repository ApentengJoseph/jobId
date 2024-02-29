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

  constructor() {}

  ngOnInit(): void {}
  selectTab(index: number) {
    this.selectedTab = index;
  }
  open() {
    this.openOptions = !this.openOptions;
  }
  openFile() {
    this.openedFile = !this.openedFile;
  }
}
