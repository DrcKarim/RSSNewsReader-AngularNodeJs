/* import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // 🟢 Utility to attach token
  private getAuthHeaders(): HttpHeaders {
    let token = '';
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token') || '';
    }

    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // ✅ Get all feeds
  getFeeds(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/feeds`, {
      headers: this.getAuthHeaders()
    });
  }

  // ✅ Get feed items by feed ID
  getFeedItems(feedId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/feeds/${feedId}/items`, {
      headers: this.getAuthHeaders()
    });
  }

  // ✅ Add new feed
  addFeed(url: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/feeds`, { url }, {
      headers: this.getAuthHeaders()
    });
  }

  // ✅ Update feed
  updateFeed(id: number, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/feeds/${id}`, data, {
      headers: this.getAuthHeaders()
    });
  }

  // ✅ Delete feed
  deleteFeed(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/feeds/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // ✅ Refresh feed
  refreshFeed(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/feeds/${id}/refresh`, {}, {
      headers: this.getAuthHeaders()
    });
  }


}
 */
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


  refreshFeed(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/feeds/${id}/refresh`, {});
  }
}
