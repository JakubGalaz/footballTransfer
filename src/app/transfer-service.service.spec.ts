import { TestBed } from '@angular/core/testing';

import { TransferServiceService } from './transfer-service.service';

describe('TransferServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransferServiceService = TestBed.get(TransferServiceService);
    expect(service).toBeTruthy();
  });
});
