import { Pipe, PipeTransform } from '@angular/core';


/*
The FeedFilterPipe is a custom Angular pipe used to filter a list of feeds based on a search term.
It checks whether the title or url of each feed includes the lowercase version of the searchText.
It's marked as standalone, meaning it can be used without being declared in a module.
This pipe powers the live search functionality in the feed sidebar.
*/
@Pipe({
  name: 'feedFilter',
  standalone: true
})
export class FeedFilterPipe implements PipeTransform {
  transform(feeds: any[], searchText: string): any[] {
    if (!feeds || !searchText) return feeds;

    const lower = searchText.toLowerCase();
    return feeds.filter(feed =>
      feed.title?.toLowerCase().includes(lower) ||
      feed.url?.toLowerCase().includes(lower)
    );
  }
}
