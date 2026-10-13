import { Component, Input } from '@angular/core';

import { PopularTagType } from '../../../../types/PopularTagType.type';

@Component({
  selector: 'mc-tag-list',
  standalone: false,
  templateUrl: './tagList.component.html',
})
export class tagListComponent {
  @Input('tags') tagsProps: PopularTagType[];
}
