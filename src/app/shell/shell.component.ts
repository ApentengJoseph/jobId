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
    { name: 'Dashboard', icon: 'bar_chart_4_bars', route: '/home' },
    { name: 'JobBoard', icon: 'work', route: '/job-board' },
    { name: 'Candidate', icon: 'group', route: '/candidate' },
    { name: 'Recruitment', icon: 'grading', route: '/recruitment' },
    { name: 'Chat', icon: 'chat-icon', route: '/chat' },
    { name: 'Settings', icon: 'settings-icon', route: '/settings' },
  ];

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
