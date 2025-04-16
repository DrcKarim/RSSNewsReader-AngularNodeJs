import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../services/feed.service';
import {FormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';
import { CommonModule } from '@angular/common';
import { FeedFilterPipe } from '../../pipes/feed-filter.pipe';


@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    CommonModule,
    FeedFilterPipe
  ],
  styleUrls: ['./feed-list.component.css']
})
export class FeedListComponent implements OnInit {
  feeds: any[] = [];
  newFeedUrl = '';
  selectedFeedId: number | null = null;
  selectedFeedItems: any[] = [];
  editingFeed: any = null;
  searchText: string = '';

  selectedFeed: any = null;

  constructor(private feedService: FeedService) {}


  ngOnInit(): void {
    this.loadFeeds();
  }

  loadFeeds(): void {
    this.feedService.getFeeds().subscribe((feeds) => {
      this.feeds = feeds;
    });
  }


  selectFeed(feedId: number): void {
    this.selectedFeedId = feedId;
    this.selectedFeed = this.feeds.find(f => f.id === feedId);
    this.feedService.getFeedItems(feedId).subscribe((res) => {
      this.selectedFeedItems = res.items;
    });
  }

  isRefreshing = false;

  refreshFeed(): void {
    if (!this.selectedFeedId) return;
    this.isRefreshing = true;

    this.feedService.refreshFeed(this.selectedFeedId).subscribe({
      next: () => {
        this.selectFeed(this.selectedFeedId!); // re-fetch
      },
      error: (err) => {
        console.error('Error refreshing feed', err);
      },
      complete: () => {
        this.isRefreshing = false;
      }
    });
  }


  addFeed(): void {
    if (!this.newFeedUrl) return;
    this.feedService.addFeed(this.newFeedUrl).subscribe(() => {
      this.newFeedUrl = '';
      this.loadFeeds();
    });
  }

  deleteFeed(id: number): void {
    this.feedService.deleteFeed(id).subscribe(() => {
      if (this.selectedFeedId === id) this.selectedFeed = null; this.selectedFeedItems = [];
      this.loadFeeds();
    });
  }


  startEditing(feed: any): void {
    this.editingFeed = { ...feed }; // clone to avoid live edits
  }

  cancelEdit(): void {
    this.editingFeed = null;
  }

  updateFeed(): void {
    if (!this.editingFeed) return;

    this.feedService.updateFeed(this.editingFeed.id, {
      title: this.editingFeed.title,
      description: this.editingFeed.description
    }).subscribe(() => {
      this.loadFeeds();
      this.editingFeed = null;
    });
  }

  itemsPerPage = 5;
  currentPage = 1;

  get totalPages(): number {
    return Math.ceil(this.selectedFeedItems.length / this.itemsPerPage);
  }

  get paginatedItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.selectedFeedItems.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  visiblePages() {
    const total = this.totalPages;
    const current = this.currentPage;
    const range = [];

    const start = Math.max(1, current - 2);
    const end = Math.min(total, current + 2);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  }


  // Feeds Pagination
  feedsPerPage = 5;
  currentFeedPage = 1;

  get totalFeedPages(): number {
    return Math.ceil(this.feeds.length / this.feedsPerPage);
  }

  get paginatedFeeds() {
    const start = (this.currentFeedPage - 1) * this.feedsPerPage;
    return this.feeds.slice(start, start + this.feedsPerPage);
  }

  visibleFeedPages(): number[] {
    const total = this.totalFeedPages;
    const current = this.currentFeedPage;
    const range = [];

    const start = Math.max(1, current - 2);
    const end = Math.min(total, current + 2);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  }

  changeFeedPage(page: number) {
    if (page >= 1 && page <= this.totalFeedPages) {
      this.currentFeedPage = page;
    }
  }



}
