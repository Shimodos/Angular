import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { GetFeedResponseInterface } from './../type/getFeedResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private http: HttpClient) {}
  getFeed(url: string): Observable<GetFeedResponseInterface> {
    const fullUrl = environment.apiUrl + url;

    return new Observable<GetFeedResponseInterface>((subscriber) => {
      this.http.get<GetFeedResponseInterface>(fullUrl).subscribe({
        next: (data) => {
          subscriber.next(data);
          subscriber.complete();
        },
        error: (error) => {
          subscriber.error(error);
        },
      });
    });
  }
}
