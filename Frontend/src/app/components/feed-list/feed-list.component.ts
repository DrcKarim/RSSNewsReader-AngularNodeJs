import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../services/feed.service';
import {FormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    CommonModule
  ],
  styleUrls: ['./feed-list.component.css']
})
export class FeedListComponent implements OnInit {
  feeds: any[] = [];
  newFeedUrl = '';
  selectedFeedId: number | null = null;
  selectedFeedItems: any[] = [];

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
    this.feedService.getFeedItems(feedId).subscribe((res) => {
      this.selectedFeedItems = res.items;
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
      if (this.selectedFeedId === id) this.selectedFeedItems = [];
      this.loadFeeds();
    });
  }
}
