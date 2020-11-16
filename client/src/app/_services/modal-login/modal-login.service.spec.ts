import { TestBed, inject } from '@angular/core/testing';

import { ModalLoginService } from './modal-login.service';

describe('ModalLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalLoginService]
    });
  });

  it('should be created', inject([ModalLoginService], (service: ModalLoginService) => {
    expect(service).toBeTruthy();
  }));
});
