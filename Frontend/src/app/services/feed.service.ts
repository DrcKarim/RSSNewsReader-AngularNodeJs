import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


/*
The FeedService is an Angular service that centralizes all HTTP requests related to RSS feed operations.
It interacts with the backend API to perform tasks like getting all feeds, fetching feed items,
adding new feeds, updating or deleting existing ones, and manually refreshing a feed. It uses
Angular’s HttpClient for the requests and retrieves the base URL from environment variables (environment.apiUrl).
*/

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

  // Refresh feed
  refreshFeed(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/feeds/${id}/refresh`, {});
  }

  // Get recommended articles 
  // getRecommended(): Observable<any> { 
  //   return this.http.get<any>(`${this.apiUrl}/feeds/recommendations`);
  // }

sendRecommended(readIds: number[]): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/feeds/recommendations`, { readIds });
}


getSmartRecommended(readIds: number[]): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/feeds/smart-recommendations`, { readIds });
}

getAIRecommended(readIds: number[]) {
  return this.http.post<any>(`${this.apiUrl}/feeds/ai-recommendations`, { readIds });
}

getByCategory(category: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/feeds/by-category?category=${category}`);
}

}
