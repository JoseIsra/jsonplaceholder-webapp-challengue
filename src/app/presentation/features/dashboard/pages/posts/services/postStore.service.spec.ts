import { TestBed } from '@angular/core/testing';
import { PostStoreService } from './postStore.service';
import { PostModel } from '@/domain/models/posts/posts.response.model';

describe('PostStoreService', () => {
  let service: PostStoreService;

  const mockPost: PostModel = {
    userId: 1,
    id: 1,
    title: 'Test Post',
    body: 'Test body content',
  };

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
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostStoreService],
    });
    service = TestBed.inject(PostStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('posts getter', () => {
    it('should return empty array initially', () => {
      expect(service.posts).toEqual([]);
    });

    it('should return posts after setting them', () => {
      service.setPosts(mockPosts);
      expect(service.posts).toEqual(mockPosts);
    });
  });

  describe('totalPosts getter', () => {
    it('should return empty array initially', () => {
      expect(service.totalPosts).toEqual([]);
    });

    it('should return total posts after setting them', () => {
      service.setTotalPosts(mockPosts);
      expect(service.totalPosts).toEqual(mockPosts);
    });
  });

  describe('addNewPost', () => {
    it('should add a new post at the beginning of the posts array', () => {
      service.setPosts(mockPosts);
      const newPost: PostModel = {
        userId: 3,
        id: 3,
        title: 'New Post',
        body: 'New post body',
      };

      service.addNewPost(newPost);

      expect(service.posts.length).toBe(3);
      expect(service.posts[0]).toEqual(newPost);
      expect(service.posts[1]).toEqual(mockPosts[0]);
      expect(service.posts[2]).toEqual(mockPosts[1]);
    });

    it('should add post to empty array', () => {
      service.addNewPost(mockPost);
      expect(service.posts.length).toBe(1);
      expect(service.posts[0]).toEqual(mockPost);
    });
  });

  describe('updatePost', () => {
    it('should update existing post by id', () => {
      service.setPosts(mockPosts);
      const updatedPost: PostModel = {
        ...mockPosts[0],
        title: 'Updated Title',
        body: 'Updated body',
      };

      service.updatePost(updatedPost);

      expect(service.posts.length).toBe(2);
      expect(service.posts[0]).toEqual(updatedPost);
      expect(service.posts[1]).toEqual(mockPosts[1]);
    });

    it('should not update post if id does not exist', () => {
      service.setPosts(mockPosts);
      const nonExistentPost: PostModel = {
        userId: 999,
        id: 999,
        title: 'Non-existent Post',
        body: 'Non-existent body',
      };

      service.updatePost(nonExistentPost);

      expect(service.posts).toEqual(mockPosts);
    });

    it('should handle empty posts array', () => {
      service.updatePost(mockPost);
      expect(service.posts).toEqual([]);
    });
  });

  describe('setPosts', () => {
    it('should set posts array', () => {
      service.setPosts(mockPosts);
      expect(service.posts).toEqual(mockPosts);
    });

    it('should replace existing posts', () => {
      service.setPosts(mockPosts);
      const newPosts: PostModel[] = [
        {
          userId: 3,
          id: 3,
          title: 'Third Post',
          body: 'Third post body',
        },
      ];

      service.setPosts(newPosts);
      expect(service.posts).toEqual(newPosts);
      expect(service.posts.length).toBe(1);
    });

    it('should set empty array', () => {
      service.setPosts(mockPosts);
      service.setPosts([]);
      expect(service.posts).toEqual([]);
    });
  });

  describe('setTotalPosts', () => {
    it('should set total posts array', () => {
      service.setTotalPosts(mockPosts);
      expect(service.totalPosts).toEqual(mockPosts);
    });

    it('should replace existing total posts', () => {
      service.setTotalPosts(mockPosts);
      const newTotalPosts: PostModel[] = [
        {
          userId: 3,
          id: 3,
          title: 'Third Post',
          body: 'Third post body',
        },
      ];

      service.setTotalPosts(newTotalPosts);
      expect(service.totalPosts).toEqual(newTotalPosts);
      expect(service.totalPosts.length).toBe(1);
    });

    it('should set empty array for total posts', () => {
      service.setTotalPosts(mockPosts);
      service.setTotalPosts([]);
      expect(service.totalPosts).toEqual([]);
    });
  });

  describe('signal reactivity', () => {
    it('should maintain separate state for posts and totalPosts', () => {
      service.setPosts(mockPosts);
      service.setTotalPosts([mockPost]);

      expect(service.posts).toEqual(mockPosts);
      expect(service.totalPosts).toEqual([mockPost]);
      expect(service.posts).not.toEqual(service.totalPosts);
    });
  });
});
