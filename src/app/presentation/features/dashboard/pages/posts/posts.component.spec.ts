import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { PostsComponent } from './posts.component';
import { ObtenerPostsUseCase } from '@/domain/usecases/posts/obtener-posts/obtener-posts.usecase';
import { PostStoreService } from './services/postStore.service';
import { DialogTriggerService } from '@/presentation/shared/services/dialog-trigger/dialog-trigger.service';
import { UsersStoreService } from '../usuarios/services/usersStore.service';
import { PostModel } from '@/domain/models/posts/posts.response.model';
import { UserDto } from '@/data/dtos/users/users.response.dto';
import { Paginator } from '@/presentation/shared/components/paginator/paginator.types';
import { CreatePostDialogComponent } from './components/create-post-dialog/create-post-dialog.component';
import { asyncData, asyncError } from '@/data/utils/testing/async-data';
import { ErrorDialogComponent } from '@/presentation/shared/components/error-dialog/error-dialog.component';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let mockObtenerPostsUseCase: jasmine.SpyObj<ObtenerPostsUseCase>;
  let mockPostStoreService: jasmine.SpyObj<PostStoreService>;
  let mockDialogTriggerService: jasmine.SpyObj<DialogTriggerService>;

  const mockPosts: PostModel[] = [
    {
      userId: 1,
      id: 1,
      title: 'First Post',
      body: 'First post body',
    },
    {
      userId: 2,
      id: 2,
      title: 'Second Post',
      body: 'Second post body',
    },
    {
      userId: 1,
      id: 3,
      title: 'Third Post',
      body: 'Third post body',
    },
  ];

  const mockUsers: UserDto[] = [
    {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      phone: '123-456-7890',
    },
    {
      id: 2,
      name: 'Jane Smith',
      username: 'janesmith',
      email: 'jane@example.com',
      phone: '098-765-4321',
    },
  ];

  beforeEach(() => {
    const obtenerPostsSpy = jasmine.createSpyObj('ObtenerPostsUseCase', [
      'execute',
    ]);
    const postStoreSpy = jasmine.createSpyObj(
      'PostStoreService',
      ['setPosts', 'setTotalPosts'],
      {
        posts: mockPosts.slice(0, 10),
        totalPosts: mockPosts,
      },
    );
    const dialogTriggerSpy = jasmine.createSpyObj('DialogTriggerService', [
      'triggerDefaulDialog',
    ]);
    const usersStoreSpy = jasmine.createSpyObj('UsersStoreService', [], {
      totalUsers: mockUsers,
    });

    TestBed.configureTestingModule({
      imports: [PostsComponent],
      providers: [
        { provide: ObtenerPostsUseCase, useValue: obtenerPostsSpy },
        { provide: PostStoreService, useValue: postStoreSpy },
        { provide: DialogTriggerService, useValue: dialogTriggerSpy },
        { provide: UsersStoreService, useValue: usersStoreSpy },
      ],
    });

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;

    mockObtenerPostsUseCase = TestBed.inject(
      ObtenerPostsUseCase,
    ) as jasmine.SpyObj<ObtenerPostsUseCase>;
    mockPostStoreService = TestBed.inject(
      PostStoreService,
    ) as jasmine.SpyObj<PostStoreService>;
    mockDialogTriggerService = TestBed.inject(
      DialogTriggerService,
    ) as jasmine.SpyObj<DialogTriggerService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call handleGetPosts on initialization', () => {
      spyOn(component, 'handleGetPosts');
      component.ngOnInit();
      expect(component.handleGetPosts).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete destroy$ subject', () => {
      spyOn(component.destroy$, 'next');
      spyOn(component.destroy$, 'complete');

      component.ngOnDestroy();

      expect(component.destroy$.next).toHaveBeenCalledWith();
      expect(component.destroy$.complete).toHaveBeenCalled();
    });
  });

  describe('handleGetPosts', () => {
    it('should load posts successfully', fakeAsync(() => {
      mockObtenerPostsUseCase.execute.and.returnValue(asyncData(mockPosts));

      spyOn(component, 'handleGetPosts').and.callThrough();
      component.handleGetPosts();

      expect(component.loading()).toBe(true);
      tick();
      expect(component.loading()).toBe(false);
      expect(mockPostStoreService.setPosts).toHaveBeenCalledWith(
        mockPosts.slice(0, component.ITEMS_PER_PAGE),
      );
      expect(mockPostStoreService.setTotalPosts).toHaveBeenCalledWith(
        mockPosts,
      );
    }));

    it('should handle error when loading posts', fakeAsync(() => {
      const error = new Error('Sucedió algo inesperado al cargar posts');
      mockObtenerPostsUseCase.execute.and.returnValue(asyncError(error));
      spyOn(component, 'handleGetPosts').and.callThrough();

      component.handleGetPosts();
      expect(component.loading()).toBe(true);
      tick();

      expect(component.loading()).toBe(false);
      expect(
        mockDialogTriggerService.triggerDefaulDialog,
      ).toHaveBeenCalledOnceWith(ErrorDialogComponent, {
        data: {
          message: error.message,
        },
      });
    }));
  });

  describe('onPageChange', () => {
    it('should handle page change for first page', () => {
      const paginator: Paginator = { page: 1, lastPage: 3 };

      spyOn(component, 'onPageChange').and.callThrough();
      component.onPageChange(paginator);

      expect(mockPostStoreService.setPosts).toHaveBeenCalledWith(
        mockPosts.slice(0, component.ITEMS_PER_PAGE),
      );
    });

    it('should handle page change for middle page', () => {
      const paginator: Paginator = { page: 2, lastPage: 3 };
      spyOn(component, 'onPageChange').and.callThrough();

      component.onPageChange(paginator);
      const initFrom = (paginator.page - 1) * component.ITEMS_PER_PAGE;

      expect(mockPostStoreService.setPosts).toHaveBeenCalledWith(
        mockPosts.slice(initFrom, component.ITEMS_PER_PAGE + initFrom),
      );
    });

    it('should handle page change for last page', () => {
      const paginator: Paginator = { page: 3, lastPage: 3 };
      spyOn(component, 'onPageChange').and.callThrough();

      component.onPageChange(paginator);
      const initFrom = (paginator.page - 1) * component.ITEMS_PER_PAGE;

      expect(mockPostStoreService.setPosts).toHaveBeenCalledWith(
        mockPosts.slice(initFrom),
      );
    });
  });

  describe('handleEditPost', () => {
    it('should trigger edit dialog with correct data', () => {
      const postToEdit: PostModel = mockPosts[0];

      spyOn(component, 'handleEditPost').and.callThrough();
      component.handleEditPost(postToEdit);

      expect(mockDialogTriggerService.triggerDefaulDialog).toHaveBeenCalledWith(
        CreatePostDialogComponent,
        {
          data: {
            users: mockUsers,
            postData: postToEdit,
            edit: true,
          },
        },
      );
    });
  });

  describe('handleCreatePost', () => {
    it('should trigger create dialog with correct data', () => {
      spyOn(component, 'handleCreatePost').and.callThrough();
      component.handleCreatePost();

      expect(mockDialogTriggerService.triggerDefaulDialog).toHaveBeenCalledWith(
        CreatePostDialogComponent,
        {
          data: {
            users: mockUsers,
          },
        },
      );
    });
  });

  describe('computed properties', () => {
    it('should return posts from store', () => {
      expect(component.postsList()).toEqual(mockPosts.slice(0, 10));
    });

    it('should return total posts from store', () => {
      expect(component.totalPosts()).toEqual(mockPosts);
    });
  });

  describe('component properties', () => {
    it('should have correct ITEMS_PER_PAGE value', () => {
      expect(component.ITEMS_PER_PAGE).toBe(10);
    });

    it('should initialize currentPage to 1', () => {
      expect(component.currentPage()).toBe(1);
    });

    it('should initialize loading to false', () => {
      expect(component.loading()).toBe(false);
    });
  });

  describe('signal reactivity', () => {
    it('should update loading signal correctly', () => {
      component.loading.set(true);
      expect(component.loading()).toBe(true);

      component.loading.set(false);
      expect(component.loading()).toBe(false);
    });

    it('should update currentPage signal correctly', () => {
      component.currentPage.set(2);
      expect(component.currentPage()).toBe(2);
    });
  });
});
