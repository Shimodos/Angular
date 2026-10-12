import { Component, Input } from '@angular/core';

import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'mc-pagination',
  standalone: false,
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input('total') totalProps: number;
  @Input('limit') limitProps: number;
  @Input('currentPage') currentPageProps: number;
  @Input('url') urlProps: string;

  pageCount: number;

  constructor(private utilsService: UtilsService) {}

  ngOnInit() {
    this.pageCount = Math.ceil(this.totalProps / this.limitProps);
  }

  get pages(): number[] {
    return this.utilsService.range(1, this.pageCount);
  }
}
