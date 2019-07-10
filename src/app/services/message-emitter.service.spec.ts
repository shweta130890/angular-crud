import { TestBed } from '@angular/core/testing';

import { MessageEmitterService } from './message-emitter.service';

describe('MessageEmitterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageEmitterService = TestBed.get(MessageEmitterService);
    expect(service).toBeTruthy();
  });
});
