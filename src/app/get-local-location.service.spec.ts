import { TestBed, inject } from '@angular/core/testing';

import { GetLocalLocationService } from './get-local-location.service';

describe('GetLocalLocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetLocalLocationService]
    });
  });

  it('should be created', inject([GetLocalLocationService], (service: GetLocalLocationService) => {
    expect(service).toBeTruthy();
  }));
});
