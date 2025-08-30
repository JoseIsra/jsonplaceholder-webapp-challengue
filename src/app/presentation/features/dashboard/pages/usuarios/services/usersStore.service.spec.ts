/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UsersStoreService } from './usersStore.service';

describe('Service: UsersStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersStoreService]
    });
  });

  it('should ...', inject([UsersStoreService], (service: UsersStoreService) => {
    expect(service).toBeTruthy();
  }));
});
