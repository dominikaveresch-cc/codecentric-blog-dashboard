import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { Article } from '../../../../shared/models/article.interface';

@Component({
  selector: 'app-article-tile',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './article-tile.component.html',
  styleUrls: ['./article-tile.component.scss']
})
export class ArticleTileComponent {
  @Input({ required: true }) article!: Article;

  openArticle(): void {
    window.open(this.article.url, '_blank');
  }
}