import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BannerModule } from '../shared/modules/banner/banner.module';
import { FeedModule } from '../shared/modules/feed/feed.module';
import { FeedToggleModule } from '../shared/modules/feedToggle/feedToggle.module';
import { tagModule } from '../shared/modules/tag/tag.module';
import { TagFeedComponent } from './components/tagFeed/tagFeed.component';

const routes: Routes = [
  {
    path: 'tags/:slug',
    component: TagFeedComponent,
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
  declarations: [TagFeedComponent],
  providers: [],
})
export class TagFeedModule {}
