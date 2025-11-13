import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Article } from '../../shared/models/article.interface';
import { BlogService } from '../../core/services/blog.service';
import { ArticleGridComponent } from './components/article-grid/article-grid.component';
import { LoadingSkeletonComponent } from './components/loading-skeleton/loading-skeleton.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ArticleGridComponent, LoadingSkeletonComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  articles = signal<Article[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private readonly blogService: BlogService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.loading.set(true);
    this.error.set(null);

    this.blogService.getArticles().subscribe({
      next: (articles) => {
        this.articles.set(articles);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load articles. Please try again later.');
        this.loading.set(false);
        console.error('Error loading articles:', err);
      }
    });
  }
}