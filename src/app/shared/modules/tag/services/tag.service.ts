import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { PopularTagType } from '../../../types/PopularTagType.type';
import { GetTagsResponseInterface } from '../type/getTagsResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private http: HttpClient) {}

  getTags(): Observable<PopularTagType[]> {
    const fullUrl = environment.apiUrl + '/tags';

    return this.http
      .get<GetTagsResponseInterface>(fullUrl)
      .pipe(map((response) => response.tags));
  }
}
