import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { UsersRepositoryImpl } from './users.repository.impl';
import { ApiManifest } from '@/data/constants/api-manifest';
import { GetSingleUserRequestModel } from '@/domain/models/users/users.request.model';
import { UserModel } from '@/domain/models/users/users.response.model';
import { provideHttpClient } from '@angular/common/http';

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

const mockSingleUser: UserModel = {
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
};

describe('UsersRepositoryImpl', () => {
  let service: UsersRepositoryImpl;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        UsersRepositoryImpl,
      ],
    });

    service = TestBed.inject(UsersRepositoryImpl);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllUsers', () => {
    it('should return all users successfully', (done) => {
      service.getAllUsers().subscribe((users) => {
        expect(users).toEqual(mockUsers);
        expect(users.length).toBe(2);
        done();
      });

      const req = httpMock.expectOne(ApiManifest.USERS_URL);
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);
    });

    it('should handle error when getting all users fails', (done) => {
      service.getAllUsers().subscribe({
        next: () => done.fail('should have failed with an error'),
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Internal Server Error');
          done();
        },
      });

      const req = httpMock.expectOne(ApiManifest.USERS_URL);
      expect(req.request.method).toBe('GET');
      req.flush(null, {
        status: 500,
        statusText: 'Internal Server Error',
      });
    });
  });

  describe('getSingleUser', () => {
    it('should return single user successfully', (done) => {
      const userId = 1;
      const params: GetSingleUserRequestModel = { id: userId };

      service.getSingleUser(params).subscribe((user) => {
        expect(user).toEqual(mockSingleUser);
        expect(user.id).toBe(userId);
        expect(user.name).toBe('Leanne Graham');
        done();
      });

      const req = httpMock.expectOne(`${ApiManifest.USERS_URL}/${userId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockSingleUser);
    });

    it('should handle error when getting single user fails', (done) => {
      const userId = 999;
      const params: GetSingleUserRequestModel = { id: userId };

      service.getSingleUser(params).subscribe({
        next: () => done.fail('should have failed with an error'),
        error: (error) => {
          expect(error.status).toBe(404);
          expect(error.statusText).toBe('Not Found');
          done();
        },
      });

      const req = httpMock.expectOne(`${ApiManifest.USERS_URL}/${userId}`);
      expect(req.request.method).toBe('GET');
      req.flush(null, {
        status: 404,
        statusText: 'Not Found',
      });
    });
  });
});
