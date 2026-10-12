import { log } from 'console';

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { environment } from '../../../../../../environments/environment.local';
import { getFeedAction } from '../../store/actions/getFeed.action';
import { errorSelector, feedSelector, isLoadingSelector } from '../../store/selectors';
import { GetFeedResponseInterface } from '../../type/getFeedResponse.interface';

@Component({
  selector: 'mc-feed',
  standalone: false,
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  @Input('apiUrl') apiUrlProps: string;

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  feed$: Observable<GetFeedResponseInterface | null>;
  limit = environment.limit;
  baseUrl: string;
  currentPage: number;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchFeed();
    this.initializeListeners();
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.feed$ = this.store.pipe(select(feedSelector));
    this.baseUrl = this.router.url.split('?')[0];
  }

  initializeListeners(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = Number(params['page'] || '1');
      console.log('Current Page:', this.currentPage);
      const offset = (this.currentPage - 1) * this.limit;
      this.fetchFeedWithParams(offset);
    });
  }

  fetchFeedWithParams(offset: number): void {
    const apiUrlWithParams = `${this.apiUrlProps}?limit=${this.limit}&offset=${offset}`;
    this.store.dispatch(getFeedAction({ url: apiUrlWithParams }));
  }

  fetchFeed(): void {
    this.store.dispatch(getFeedAction({ url: this.apiUrlProps }));
  }
}
