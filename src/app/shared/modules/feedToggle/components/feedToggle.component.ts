import { Component, Input, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { isLoggedInSelector } from '../../../../auth/store/selectors';

@Component({
  selector: 'mc-feed-toggle',
  standalone: false,
  templateUrl: './feedToggle.component.html',
})
export class FeedToggleComponent implements OnInit {
  @Input('tagName') tagNameProps: string | null;

  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
  }
}
