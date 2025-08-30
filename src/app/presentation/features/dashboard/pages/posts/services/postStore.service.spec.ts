/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PostStoreService } from './postStore.service';

describe('Service: PostStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostStoreService]
    });
  });

  it('should ...', inject([PostStoreService], (service: PostStoreService) => {
    expect(service).toBeTruthy();
  }));
});
