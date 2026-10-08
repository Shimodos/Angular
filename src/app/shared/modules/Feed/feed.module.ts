import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { reducers } from '../Feed/store/reducers';
import { FeedComponent } from './components/feed/feed.component';
import { FeedService } from './services/feed.service';
import { GetFeedEffects } from './store/effects/getFeed.effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    EffectsModule.forFeature([GetFeedEffects]),
    StoreModule.forFeature('feed', reducers),
  ],
  declarations: [FeedComponent],
  exports: [FeedComponent],
  providers: [FeedService],
})
export class FeedModule {}
