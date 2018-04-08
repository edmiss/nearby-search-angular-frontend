import { TestBed, inject } from '@angular/core/testing';

import { ConvertTimeService } from './convert-time.service';

describe('ConvertTimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConvertTimeService]
    });
  });

  it('should be created', inject([ConvertTimeService], (service: ConvertTimeService) => {
    expect(service).toBeTruthy();
  }));
});
