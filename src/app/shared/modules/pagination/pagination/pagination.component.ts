import { Component, Input } from '@angular/core';

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

  get pages(): number[] {
    const pagesCount = Math.ceil(this.totalProps / this.limitProps);
    return Array.from({ length: pagesCount }, (_, index) => index + 1);
  }
}
