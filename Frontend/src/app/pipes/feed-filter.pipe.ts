import { Pipe, PipeTransform } from '@angular/core';

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
