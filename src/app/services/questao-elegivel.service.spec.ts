import { TestBed } from '@angular/core/testing';

import { QuestaoElegivelService } from './questao-elegivel.service';

describe('QuestaoElegivelService', () => {
  let service: QuestaoElegivelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestaoElegivelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
