import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import { AuthenticationService, CredentialsService } from '@app/auth';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  public menuItems = [
    { name: 'Dashboard', icon: '../../assets/grid-3.png', route: '/home' },
    { name: 'JobBoard', icon: '../../assets/briefcase.png', route: '/job-board' },
    { name: 'Candidate', icon: '../../assets/personalcard.png', route: '/candidate' },
    { name: 'Recruitment', icon: '../../assets/calendar-2.png', route: '/recruitment' },
    { name: 'Message', icon: '../../assets/messages-3.png', route: '/chat' },
    { name: 'Notification', icon: '../../assets/setting-2.png', route: '/settings' },
  ];

  showChat: boolean = true;
  showFloatingChat: boolean = false;

  isSideNavOpen: boolean = true;

  @ViewChild('sidenav') sideNav!: MatSidenav;

  constructor(
    private router: Router,
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private breakpoint: BreakpointObserver
  ) {}

  ngOnInit() {}

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
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

  openSidenav(): void {
    if (this.sideNav) {
      this.sideNav.open();
      this.isSideNavOpen = !this.isSideNavOpen;
    }
  }

  closeSidenav(): void {
    if (this.sideNav) {
      this.sideNav.close();
      this.isSideNavOpen = !this.isSideNavOpen;
    }
  }

  get isMobile(): boolean {
    return this.breakpoint.isMatched(Breakpoints.Small) || this.breakpoint.isMatched(Breakpoints.XSmall);
  }

  get title(): string {
    return this.titleService.getTitle();
  }
}
