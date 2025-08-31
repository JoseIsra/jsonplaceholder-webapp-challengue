import { TestBed } from '@angular/core/testing';
import { ObtenerPostsUseCaseImpl } from './obtener-posts.usecase.impl';
import { UsersStoreService } from '@/presentation/features/dashboard/pages/usuarios/services/usersStore.service';
import { UsersRepository } from '@/domain/repositories/users/users.repository';
import { ObtenerUsuariosMapper } from '../../usuarios/obtener-usuarios/mapper';
import { UserModel } from '@/domain/models/users/users.response.model';
import { PostModel } from '@/domain/models/posts/posts.response.model';
import { of, throwError } from 'rxjs';
import { PostsRepository } from '@/domain/repositories/posts/posts.repository';

const mockUsers: UserModel[] = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496',
      },
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets',
    },
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    address: {
      street: 'Victor Plains',
      suite: 'Suite 879',
      city: 'Wisokyburgh',
      zipcode: '90566-7771',
      geo: {
        lat: '-43.9509',
        lng: '-34.4618',
      },
    },
    phone: '010-692-6593 x09125',
    website: 'anastasia.net',
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains',
    },
  },
];

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

describe('Obtener Posts Usecase', () => {
  let usecase: ObtenerPostsUseCaseImpl;
  let mockUserstore: jasmine.SpyObj<UsersStoreService>;
  let mockUserRepository: jasmine.SpyObj<UsersRepository>;
  let mockPostRepository: jasmine.SpyObj<PostsRepository>;
  let mockUsersMapper: jasmine.SpyObj<ObtenerUsuariosMapper>;

  beforeEach(() => {
    const postsRepositorySpy = jasmine.createSpyObj<PostsRepository>(
      'PostsRepository',
      ['getAllPosts'],
    );
    const userStoreSpy = jasmine.createSpyObj<UsersStoreService>(
      'UsersStoreService',
      ['setTotalUsers'],
    );
    const userRepositorySpy = jasmine.createSpyObj<UsersRepository>(
      'UsersRepository',
      ['getAllUsers'],
    );
    const usersMapperSpy = jasmine.createSpyObj<ObtenerUsuariosMapper>(
      'ObtenerUsuariosMapper',
      ['toDataDto'],
    );

    TestBed.configureTestingModule({
      providers: [
        ObtenerPostsUseCaseImpl,
        {
          provide: UsersStoreService,
          useValue: userStoreSpy,
        },
        {
          provide: UsersRepository,
          useValue: userRepositorySpy,
        },
        {
          provide: ObtenerUsuariosMapper,
          useValue: usersMapperSpy,
        },
        {
          provide: PostsRepository,
          useValue: postsRepositorySpy,
        },
      ],
    });

    usecase = TestBed.inject(ObtenerPostsUseCaseImpl);
    mockUserstore = userStoreSpy;
    mockUserRepository = userRepositorySpy;
    mockUsersMapper = usersMapperSpy;
    mockPostRepository = postsRepositorySpy;
  });

  it('should create usecase', () => {
    expect(usecase).toBeTruthy();
  });

  it('should get all posts sucessfully', (done) => {
    mockUserRepository.getAllUsers.and.returnValue(of(mockUsers));
    mockPostRepository.getAllPosts.and.returnValue(of(mockPosts));

    usecase.execute().subscribe({
      next: (response) => {
        expect(response).toEqual(mockPosts);
        expect(mockUserstore.setTotalUsers).toHaveBeenCalled();
        expect(mockUsersMapper.toDataDto).toHaveBeenCalled();
        done();
      },
      error: done.fail,
    });
  });

  it('should handle failure for getting posts but successfully getting users', (done) => {
    const mockError = new Error('Salió mal');
    const mockMessageError = 'Sucedió algo inesperado al obtener los posts';

    mockUserRepository.getAllUsers.and.returnValue(of(mockUsers));
    mockPostRepository.getAllPosts.and.returnValue(throwError(() => mockError));

    usecase.execute().subscribe({
      next: () => done.fail,
      error: (error) => {
        expect(error.message).toEqual(mockMessageError);
        done();
      },
    });
  });

  it('should get all posts and fail getting users', (done) => {
    const mockError = new Error('Salió mal');

    mockUserRepository.getAllUsers.and.returnValue(throwError(() => mockError));
    mockPostRepository.getAllPosts.and.returnValue(of(mockPosts));

    usecase.execute().subscribe({
      next: (response) => {
        expect(response).toEqual(mockPosts);
        done();
      },
      error: done.fail,
    });
  });

  it('should handle failure for all services', (done) => {
    const mockError = new Error('Salió mal');
    const mockMessageError = 'Sucedió algo inesperado al obtener los posts';

    mockUserRepository.getAllUsers.and.returnValue(throwError(() => mockError));
    mockPostRepository.getAllPosts.and.returnValue(throwError(() => mockError));

    usecase.execute().subscribe({
      next: () => done.fail,
      error: (error) => {
        expect(error.message).toEqual(mockMessageError);
        done();
      },
    });
  });
});
