import { TestBed } from '@angular/core/testing';

import { SupabaseServiceTsService } from './supabase.service.ts.service';

describe('SupabaseServiceTsService', () => {
  let service: SupabaseServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupabaseServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
