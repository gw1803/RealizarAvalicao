import { TestBed } from '@angular/core/testing';

import { GrupoQuestaoService } from './grupo-questao.service';

describe('GrupoQuestaoService', () => {
  let service: GrupoQuestaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoQuestaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
