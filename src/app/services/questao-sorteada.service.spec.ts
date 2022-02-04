import { TestBed } from '@angular/core/testing';

import { QuestaoSorteadaService } from './questao-sorteada.service';

describe('QuestaoSorteadaService', () => {
  let service: QuestaoSorteadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestaoSorteadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
