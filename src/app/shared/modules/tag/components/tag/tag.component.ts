import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { PopularTagType } from '../../../../types/PopularTagType.type';
import { getTagsAction } from '../../store/actions/getTags.action';
import { errorSelector, isLoadingSelector, tagsSelector } from '../../store/selectors';

@Component({
  selector: 'mc-tags',
  standalone: false,
  templateUrl: './tag.component.html',
})
export class tagComponent implements OnInit {
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  tags$: Observable<PopularTagType[] | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.tags$ = this.store.pipe(select(tagsSelector));
  }

  fetchData(): void {
    this.store.dispatch(getTagsAction());
  }
}
