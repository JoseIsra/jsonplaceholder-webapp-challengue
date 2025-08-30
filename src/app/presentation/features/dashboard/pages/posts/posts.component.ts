import { ObtenerPostsUseCase } from '@/domain/usecases/posts/obtener-posts/obtener-posts.usecase';
import { DataTableComponent } from '@/presentation/shared/components/data-table/data-table.component';
import { PaginatorComponent } from '@/presentation/shared/components/paginator/paginator.component';
import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Subject, takeUntil } from 'rxjs';
import { PostStoreService } from './services/postStore.service';
import { NoParam } from '@/domain/base/params/no-param.paylod';
import { PostModel } from '@/domain/models/posts/posts.response.model';
import { Paginator } from '@/presentation/shared/components/paginator/paginator.types';
import { DialogTriggerService } from '@/presentation/shared/services/dialog-trigger/dialog-trigger.service';
import { CreatePostDialogComponent } from './components/create-post-dialog/create-post-dialog.component';
import { UsersStoreService } from '../usuarios/services/usersStore.service';
import { CardsPostComponent } from './components/cards-post/cards-post.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  standalone: true,
  imports: [
    DataTableComponent,
    PaginatorComponent,
    FormsModule,
    MatButtonModule,
    MatIcon,
    NgTemplateOutlet,
    CardsPostComponent,
  ],
})
export class PostsComponent implements OnInit, OnDestroy {
  readonly ITEMS_PER_PAGE = 10;

  destroy$ = new Subject<void>();
  currentPage = signal(1);
  loading = signal(false);

  constructor(
    private obtenerPostsUseCase: ObtenerPostsUseCase,
    private postStoreService: PostStoreService,
    private triggerDialog: DialogTriggerService,
    private userStoreService: UsersStoreService,
  ) {}

  ngOnInit() {
    this.handleGetPosts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  postsList = computed(() => this.postStoreService.posts);

  totalPosts = computed(() => this.postStoreService.totalPosts);

  handleGetPosts() {
    this.loading.set(true);
    this.obtenerPostsUseCase
      .execute(new NoParam())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.loading.set(false);
          this.postStoreService.setPosts(res.slice(0, this.ITEMS_PER_PAGE));
          this.postStoreService.setTotalPosts(res);
        },
        error: (error) => {
          this.loading.set(false);
          console.error(error);
        },
      });
  }

  onPageChange(paginator: Paginator) {
    const newPage = (paginator.page - 1) * this.ITEMS_PER_PAGE;
    const slicedUsers =
      paginator.page === paginator.lastPage
        ? this.totalPosts().slice(newPage)
        : this.totalPosts().slice(newPage, newPage + this.ITEMS_PER_PAGE);

    this.postStoreService.setPosts(slicedUsers);
  }

  handleEditPost(post: PostModel) {
    this.triggerDialog.triggerDefaulDialog(CreatePostDialogComponent, {
      data: {
        users: this.userStoreService.totalUsers,
        postData: post,
        edit: true,
      },
    });
  }

  handleCreatePost() {
    this.triggerDialog.triggerDefaulDialog(CreatePostDialogComponent, {
      data: {
        users: this.userStoreService.totalUsers,
      },
    });
  }
}
