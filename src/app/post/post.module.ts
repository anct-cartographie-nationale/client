import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { PostRoutingModule } from './post-routing.module';
import { PostHeaderComponent } from './components/post-header/post-header.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { SharedModule } from '../shared/shared.module';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostPublishComponent } from './components/post-publish/post-publish.component';
import { PostModalFiltersComponent } from './components/post-modal-filters/post-modal-filters.component';
import { TagResolver } from './resolvers/tags.resolver';
import { PostTagComponent } from './components/post-tag/post-tag.component';

@NgModule({
  declarations: [
    NewsComponent,
    PostHeaderComponent,
    PostListComponent,
    PostDetailsComponent,
    PostCardComponent,
    PostModalFiltersComponent,
    PostPublishComponent,
    PostTagComponent,
  ],
  imports: [CommonModule, PostRoutingModule, SharedModule],
  providers: [TagResolver],
})
export class PostModule {}
