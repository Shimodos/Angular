import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { currentUserSelector } from '../../../auth/store/selectors';
import { AppStateInterface } from '../../../shared/types/appState.interface';
import { ArticleInterface } from '../../../shared/types/article.interface';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { getArticlesAction } from '../../store/actions/getArticle.action';
import { articleSelector, errorSelector, isLoadingSelector } from '../../store/selectors';

@Component({
  selector: 'mc-article',
  standalone: false,
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  slug: string;

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  article: ArticleInterface | null;
  articleSubscription: Subscription;
  isAuthor$: Observable<boolean>;

  constructor(
    private store: Store<AppStateInterface>,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    this.fetchArticle();
  }

  // Подписка на стор живёт столько же, сколько компонент:
  // сохраняем её и отписываемся в ngOnDestroy, иначе при каждом открытии
  // статьи будет оставаться «висячая» подписка.
  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe();
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isAuthor$ = combineLatest([
      this.store.pipe(select(articleSelector)),
      this.store.pipe(select(currentUserSelector)),
    ]).pipe(
      map(([article, currentUser]: [ArticleInterface | null, CurrentUserInterface | null]) => {
        if (!article || !currentUser) {
          return false;
        }
        return article.author.username === currentUser.username;
      }),
    );
  }

  initializeListeners(): void {
    this.articleSubscription = this.store
      .pipe(select(articleSelector))
      .subscribe((article: ArticleInterface | null) => {
        this.article = article;
      });
  }

  fetchArticle(): void {
    this.store.dispatch(getArticlesAction({ slug: this.slug }));
  }
}
