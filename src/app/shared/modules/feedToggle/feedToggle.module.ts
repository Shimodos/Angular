import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FeedToggleComponent } from './components/feedToggle.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [FeedToggleComponent],
  exports: [FeedToggleComponent],
})
export class FeedToggleModule {}
