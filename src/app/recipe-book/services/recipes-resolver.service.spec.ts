import { TestBed } from '@angular/core/testing';

import { RecipesResolverService } from './recipes-resolver.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('RecipesResolverService', () => {
  let service: RecipesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RecipesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
