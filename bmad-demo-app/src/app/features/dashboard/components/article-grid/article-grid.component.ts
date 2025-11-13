import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from '../../../../shared/models/article.interface';
import { ArticleTileComponent } from '../article-tile/article-tile.component';

@Component({
  selector: 'app-article-grid',
  standalone: true,
  imports: [CommonModule, ArticleTileComponent],
  templateUrl: './article-grid.component.html',
  styleUrls: ['./article-grid.component.scss']
})
export class ArticleGridComponent {
  @Input({ required: true }) articles!: Article[];
}