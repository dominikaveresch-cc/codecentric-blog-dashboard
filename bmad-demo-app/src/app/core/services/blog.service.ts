import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Article } from '../../shared/models/article.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly RSS_URL = '/api/rss';

  constructor(private readonly http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.http.get(this.RSS_URL, { responseType: 'text' }).pipe(
      map(rssXml => this.parseRSS(rssXml)),
      catchError(error => {
        console.error('[BlogService] Failed to fetch articles:', error);
        return of([]);
      })
    );
  }

  private parseRSS(rssXml: string): Article[] {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(rssXml, 'text/xml');

    // Check for parsing errors
    const parserError = xmlDoc.querySelector('parsererror');
    if (parserError) {
      console.error('[BlogService] XML parsing error:', parserError.textContent);
      return [];
    }

    const items = xmlDoc.querySelectorAll('item');
    console.log(`[BlogService] Found ${items.length} articles in RSS feed`);

    return Array.from(items).map((item, index) => ({
      id: item.querySelector('guid')?.textContent || `article-${index}`,
      title: item.querySelector('title')?.textContent || 'Untitled',
      author: item.querySelector('author')?.textContent ||
              item.querySelector('dc\\:creator')?.textContent ||
              'codecentric Team',
      publishDate: new Date(item.querySelector('pubDate')?.textContent || Date.now()),
      excerpt: this.stripHtml(item.querySelector('description')?.textContent || ''),
      url: item.querySelector('link')?.textContent || '#',
      featuredImage: this.extractImageFromContent(item) || `https://picsum.photos/seed/${index}/400/250`,
      categories: Array.from(item.querySelectorAll('category')).map(cat => cat.textContent || '')
    }));
  }

  private stripHtml(html: string): string {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return (tmp.textContent || tmp.innerText || '').substring(0, 200);
  }

  private extractImageFromContent(item: Element): string | undefined {
    // Try media:thumbnail
    const mediaThumbnail = item.querySelector('media\\:thumbnail');
    if (mediaThumbnail) {
      return mediaThumbnail.getAttribute('url') || undefined;
    }

    // Try media:content
    const mediaContent = item.querySelector('media\\:content');
    if (mediaContent) {
      return mediaContent.getAttribute('url') || undefined;
    }

    // Try enclosure
    const enclosure = item.querySelector('enclosure[type^="image"]');
    if (enclosure) {
      return enclosure.getAttribute('url') || undefined;
    }

    // Try to extract from content:encoded or description
    const content = item.querySelector('content\\:encoded')?.textContent ||
                   item.querySelector('description')?.textContent || '';
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch) {
      return imgMatch[1];
    }

    return undefined;
  }
}
