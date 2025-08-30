import { Component, input, output } from '@angular/core';
import { PostModel } from '@/domain/models/posts/posts.response.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cards-post',
  templateUrl: './cards-post.component.html',
  styleUrls: ['./cards-post.component.scss'],
  standalone: true,
  imports: [MatButtonModule],
})
export class CardsPostComponent {
  posts = input<PostModel[]>([]);
  editPost = output<PostModel>();

  handleEditPost(post: PostModel) {
    this.editPost.emit(post);
  }
}
