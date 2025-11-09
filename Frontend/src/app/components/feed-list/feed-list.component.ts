import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../services/feed.service';
import {FormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';
import { CommonModule } from '@angular/common';
import { FeedFilterPipe } from '../../pipes/feed-filter.pipe';
import { Router } from '@angular/router';

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
  isRefreshing = false;
  itemsPerPage = 5;
  currentPage = 1;

constructor(private feedService: FeedService, private router: Router) {}


showRecommended(): void {
   const readIds = JSON.parse(localStorage.getItem('readIds') || '[]');

  this.selectedFeed = { title: 'Recommended Articles' };
  this.selectedFeedId = null;

  // ✅ Send IDs and receive recommendations in one POST
  this.feedService.sendRecommended(readIds).subscribe({
    next: (res) => {
      // Here, we "get" the articles from backend response
      this.selectedFeedItems = res.recommendations;
    },
    error: (err) => {
      console.error('Error fetching recommended articles:', err);
    }
  });
}

showSmartRecommended(): void {
  const readIds = JSON.parse(localStorage.getItem('readIds') || '[]');
  this.selectedFeed = { title: '🎯 Smart Recommendations' };
  this.selectedFeedId = null;

  this.feedService.getSmartRecommended(readIds).subscribe({
    next: (res) => {
      this.selectedFeedItems = res.recommendations;
    },
    error: (err) => {
      console.error('Error fetching smart recommendations:', err);
    }
  });
}

isAILoading = false;

showAIRecommended(): void {
  this.isAILoading = true;
  this.selectedFeed = { title: '🧠 AI Recommendations' };
  this.selectedFeedId = null;

  const readIds = JSON.parse(localStorage.getItem('readIds') || '[]');

  this.feedService.getAIRecommended(readIds).subscribe({
    next: (res) => {
      this.selectedFeedItems = res.recommendations;
      this.isAILoading = false;
    },
    error: (err) => {
      console.error('AI Recommendation error:', err);
      this.isAILoading = false;
    }
  });
}

ngOnInit(): void {
    this.loadFeeds();
  }

/*
The loadFeeds() method calls the getFeeds() function from the feedService to fetch all RSS feeds from the backend.
When the data is received (subscribed to),
it assigns the result to the component's feeds property,
making it available for display in the UI (like the sidebar list).
*/
loadFeeds(): void {
    this.feedService.getFeeds().subscribe((feeds) => {
      this.feeds = feeds;
    });
  }

/*
The selectFeed() method updates the UI to show the selected feed.
It sets selectedFeedId and finds the corresponding feed object to assign to selectedFeed.
Then it calls the feedService.getFeedItems()
to fetch and display the items for that feed,
storing them in selectedFeedItems for rendering in the main panel.
*/
selectFeed(feedId: number): void {
    this.selectedFeedId = feedId;
    this.selectedFeed = this.feeds.find(f => f.id === feedId);
    this.feedService.getFeedItems(feedId).subscribe((res) => {
      this.selectedFeedItems = res.items;
    });
  }


/*
The refreshFeed() method manually refreshes the currently selected RSS feed. It sets a loading state (isRefreshing = true),
calls feedService.refreshFeed() to re-parse the feed from its source,
and then re-selects the feed to fetch the updated items.
Once the refresh is complete (or fails), it resets the loading indicator.
*/
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

/*
The addFeed() method adds a new RSS feed using the URL entered by the user. If the input is not empty,
it calls feedService.addFeed() to send the URL to the backend.
After successfully adding the feed, it clears the input field and reloads the list of feeds.
*/
addFeed(): void {
    if (!this.newFeedUrl) return;
    this.feedService.addFeed(this.newFeedUrl).subscribe({
      next: () => {
        this.newFeedUrl = '';
        this.loadFeeds();
      },
      error: (err) => {
        console.error('Failed to add feed', err);
        alert('Invalid RSS URL or feed not supported.');
      }
    });
  }

/*
The deleteFeed() method deletes a feed by its ID using feedService.deleteFeed().
If the deleted feed is currently selected, it clears the selection and associated feed items.
Then it reloads the feed list to update the sidebar.
*/
deleteFeed(id: number): void {
    this.feedService.deleteFeed(id).subscribe(() => {
      if (this.selectedFeedId === id) this.selectedFeed = null; this.selectedFeedItems = [];
      this.loadFeeds();
    });
}

/*
The startEditing() method prepares a feed for editing by creating a copy of the selected feed object
and storing it in editingFeed. This prevents immediate changes
to the original feed in the UI until the user explicitly saves the edits.
*/
startEditing(feed: any): void {
    this.editingFeed = { ...feed }; // clone to avoid live edits
  }

/* The cancelEdit() method exits edit mode by clearing the editingFeed object.
This closes the edit modal and discards any unsaved changes.
 */
cancelEdit(): void {
    this.editingFeed = null;
}
/*
The updateFeed() method saves changes made to a feed’s title or description.
It sends the updated data to the backend using feedService.updateFeed().
Once the update is successful, it reloads the feed list to reflect the
changes and closes the edit modal by clearing editingFeed.
*/
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

/* Track click when user click on any link the click tracked and sent to the backend */
markAsRead(articleId: number): void {
  const read = JSON.parse(localStorage.getItem('readIds') || '[]');
  if (!read.includes(articleId)) {
    read.push(articleId);
    localStorage.setItem('readIds', JSON.stringify(read));
  }
}

/*
The paginatedItems getter returns a subset of selectedFeedItems for the current page, based on pagination settings.
It calculates the starting index using currentPage and itemsPerPage,
then slices the array to display only the relevant feed items for that page.
*/
get paginatedItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.selectedFeedItems.slice(start, start + this.itemsPerPage);
  }

}
