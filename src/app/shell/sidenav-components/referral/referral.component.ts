import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-referral',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss'],
})
export class ReferralComponent implements OnInit {
  users = [
    { image: 'assets/images/avatar.png' },
    { image: 'assets/images/avatar.png' },
    { image: 'assets/images/avatar.png' },
    { image: 'assets/images/avatar.png' },
  ];
  earners = [
    {
      img: 'assets/icons/earner1.png',
      name: 'Jason Borne',
      chains: '224 Chains',
    },
    {
      img: 'assets/icons/earner2.png',
      name: 'Jason Borne',
      chains: '224 Chains',
    },
    {
      img: 'assets/icons/earner3.png',
      name: 'Jason Borne',
      chains: '224 Chains',
    },
    {
      img: '',
      name: 'Jason Borne',
      chains: '224 Chains',
    },
    {
      img: '',
      name: 'Jason Borne',
      chains: '224 Chains',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
