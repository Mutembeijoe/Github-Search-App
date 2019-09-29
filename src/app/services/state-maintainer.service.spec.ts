import { TestBed } from '@angular/core/testing';

import { StateMaintainerService } from './state-maintainer.service';

describe('StateMaintainerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StateMaintainerService = TestBed.get(StateMaintainerService);
    expect(service).toBeTruthy();
  });
});
