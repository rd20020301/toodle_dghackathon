import { TestBed } from '@angular/core/testing';

import { TenantsService } from './tenants.service';

describe('TenantsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TenantsService = TestBed.get(TenantsService);
    expect(service).toBeTruthy();
  });
});
