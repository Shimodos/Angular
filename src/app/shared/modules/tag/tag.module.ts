import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ErrorMesegeModule } from '../errorMesege/errorMesege.module';
import { LoadingModule } from '../loading/loading.module';
import { tagComponent } from './components/tag/tag.component';
import { TagService } from './services/tag.service';
import { GetTagsEffects } from './store/effects/getTags.effects';
import { reducers } from './store/reducers';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    EffectsModule.forFeature([GetTagsEffects]),
    StoreModule.forFeature('tags', reducers),
    ErrorMesegeModule,
    LoadingModule,
  ],
  declarations: [tagComponent],
  exports: [tagComponent],
  providers: [TagService],
})
export class tagModule {}
