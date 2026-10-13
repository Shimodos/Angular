import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { tagListComponent } from './components/tagList/tagList.component';

@NgModule({
  imports: [CommonModule],
  declarations: [tagListComponent],
  exports: [tagListComponent],
})
export class tagListModule {}
