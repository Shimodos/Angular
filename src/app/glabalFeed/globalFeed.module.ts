import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BannerModule } from '../shared/modules/banner/banner.module';
import { FeedModule } from '../shared/modules/feed/feed.module';
import { tagModule } from '../shared/modules/tag/tag.module';
import { GlobalFeedComponent } from './components/glabalFeed/globalFeed.component';

const routes: Routes = [
  {
    path: '',
    component: GlobalFeedComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FeedModule, BannerModule, tagModule],
  declarations: [GlobalFeedComponent],
  providers: [],
})
export class GlobalFeedModule {}
