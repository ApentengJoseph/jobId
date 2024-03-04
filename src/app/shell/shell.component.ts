import { Title } from '@angular/platform-browser';
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import { AuthenticationService, CredentialsService } from '@app/auth';
import { MatSidenav } from '@angular/material/sidenav';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CalenderComponent } from './sidenav-components/calender/calender.component';
import { ChatComponent } from './sidenav-components/chat/chat.component';
import { JobFolderComponent } from './sidenav-components/job-folder/job-folder.component';
import { ReferralComponent } from './sidenav-components/referral/referral.component';
import { JobsignComponent } from './sidenav-components/jobsign/jobsign.component';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  public menuItems = [
    { name: 'JobBoard', icon: '../../assets/briefcase.png', route: '/job-board' },
    { name: 'Candidate', icon: '../../assets/personalcard.png', route: '/candidate' },
    { name: 'Recruitment', icon: '../../assets/calendar-2.png', route: '/recruitment' },
    { name: 'Message', icon: '../../assets/messages-3.png', route: '/chat' },
    { name: 'Notification', icon: '../../assets/notification.png', route: '/settings' },
  ];

  public sideItems = [
    { icon: '../../assets/icons/icon-1.png', route: '/home' },
    { icon: '../../assets/icons/icon-2.png', route: '/home' },
    { icon: '../../assets/icons/icon-3.png', route: '/home' },
    { icon: '../../assets/icons/icon-4.png', route: '/home' },
    { icon: '../../assets/icons/icon-5.png', route: '/home' },
    { icon: '../../assets/icons/icon-6.png', route: '/home' },
  ];
  showChat: boolean = true;
  showFloatingChat: boolean = false;

  isSideNavOpen: boolean = true;
  isShowProfile: boolean = false;
  isFirstSideNav: boolean = false;

  public isOpen = false;
  public selectedOption = { value: 'placeholder', label: 'Select' };
  public options = [
    { value: 'Today', label: 'Today' },
    { value: 'Yesterday', label: 'Yesterday' },
  ];

  @ViewChild('sidenav') sideNav!: MatSidenav;

  constructor(
    private router: Router,
    private titleService: Title,
    private dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private breakpoint: BreakpointObserver
  ) {}

  ngOnInit() {}

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }
  showProfile() {
    this.isShowProfile = !this.isShowProfile;
  }
  selectOption(option: { value: string; label: string }) {
    this.selectedOption = option;
    this.isOpen = false;
  }
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  toggleFloatingchat(showChat: boolean) {
    console.log(showChat);
    this.showFloatingChat = !this.showFloatingChat;
  }
  openAside = false;

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.username : null;
  }

  toggleSideNav(): void {
    this.isSideNavOpen = !this.isSideNavOpen;
  }

  get isMobile(): boolean {
    return this.breakpoint.isMatched(Breakpoints.Small) || this.breakpoint.isMatched(Breakpoints.XSmall);
  }

  get title(): string {
    return this.titleService.getTitle();
  }
  openCalender() {
    this.dialog.open(CalenderComponent, {
      width: '350px',
      height: '100vh',
      position: { right: '5%' },
    });
  }
  openChat() {
    this.dialog.open(ChatComponent, {
      width: '730px',
      height: '100vh',
      position: { right: '5%' },
    });
  }
  openJobFolder() {
    this.dialog.open(JobFolderComponent, {
      width: '370px',
      height: '100vh',
      position: { right: '5%' },
    });
  }
  openReferral() {
    this.dialog.open(ReferralComponent, {
      width: '730px',
      height: '100vh',
      position: { right: '5%' },
    });
  }
  openJobSign() {
    this.dialog.open(JobsignComponent, {
      width: '450px',
      height: '100vh',
      position: { right: '5%' },
    });
  }
}
