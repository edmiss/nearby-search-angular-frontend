import { TestBed, inject } from '@angular/core/testing';

import { GetdetailService } from './getdetail.service';

describe('GetdetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetdetailService]
    });
  });

  it('should be created', inject([GetdetailService], (service: GetdetailService) => {
    expect(service).toBeTruthy();
  }));
});
