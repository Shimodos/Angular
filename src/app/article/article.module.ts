import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ErrorMesegeModule } from '../shared/modules/errorMesege/errorMesege.module';
import { LoadingModule } from '../shared/modules/loading/loading.module';
import { tagListModule } from '../shared/modules/tagList/tagList.module';
import { ArticleService as SharedArticleService } from '../shared/services/article.service';
import { ArticleComponent } from './components/article/article.component';
import { ArticleService } from './services/article.services';
import { DeleteArticleEffects } from './store/effects/deleteArticle.effects';
import { GetArticleEffects } from './store/effects/getArticle.effects';
import { reducers } from './store/reducers';

const routes = [
  {
    path: 'article/:slug',
    component: ArticleComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([GetArticleEffects, DeleteArticleEffects]),
    StoreModule.forFeature('article', reducers),
    ErrorMesegeModule,
    LoadingModule,
    tagListModule,
  ],
  declarations: [ArticleComponent],
  exports: [],
  providers: [SharedArticleService, ArticleService],
})
export class ArticleModule {}
