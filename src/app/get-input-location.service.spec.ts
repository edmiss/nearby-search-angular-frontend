import { TestBed, inject } from '@angular/core/testing';

import { GetInputLocationService } from './get-input-location.service';

describe('GetInputLocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetInputLocationService]
    });
  });

  it('should be created', inject([GetInputLocationService], (service: GetInputLocationService) => {
    expect(service).toBeTruthy();
  }));
});
