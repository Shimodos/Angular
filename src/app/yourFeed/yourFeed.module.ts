import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BannerModule } from '../shared/modules/banner/banner.module';
import { FeedModule } from '../shared/modules/feed/feed.module';
import { FeedToggleModule } from '../shared/modules/feedToggle/feedToggle.module';
import { tagModule } from '../shared/modules/tag/tag.module';
import { YourFeedComponent } from './components/yourFeed/yourFeed.component';

const routes: Routes = [
  {
    path: 'feed',
    component: YourFeedComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeedModule,
    BannerModule,
    tagModule,
    FeedToggleModule,
  ],
  declarations: [YourFeedComponent],
  providers: [],
})
export class YourFeedModule {}
