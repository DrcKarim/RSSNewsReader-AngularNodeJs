import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Get all feeds
  getFeeds(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/feeds`);
  }

  // Get feed items by feed ID
  getFeedItems(feedId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/feeds/${feedId}/items`);
  }

  // Add new feed
  addFeed(url: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/feeds`, { url });
  }

  // Update feed
  updateFeed(id: number, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/feeds/${id}`, data);
  }

  // Delete feed
  deleteFeed(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/feeds/${id}`);
  }
}
