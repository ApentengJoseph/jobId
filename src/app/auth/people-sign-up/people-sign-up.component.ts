import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-people-sign-up',
  templateUrl: './people-sign-up.component.html',
  styleUrls: ['./people-sign-up.component.scss'],
})
export class PeopleSignUpComponent implements OnInit {
  loginForm!: FormGroup;
  openSearch: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  searchUser() {
    this.openSearch = !this.openSearch;
  }
  openUser() {
    this.openSearch = false;
  }
}
