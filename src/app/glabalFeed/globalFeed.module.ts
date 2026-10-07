import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeedModule } from '../shared/modules/Feed/feed.module';
import { GlobalFeedComponent } from './components/glabalFeed/globalFeed.component';

const routes: Routes = [
  {
    path: '',
    component: GlobalFeedComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FeedModule],
  declarations: [GlobalFeedComponent],
  providers: [],
})
export class GlobalFeedModule {}
