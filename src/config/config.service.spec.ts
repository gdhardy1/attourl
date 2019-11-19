import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './config.service';
import { ConfigModule } from './config.module';

describe('ConfigService', () => {
  let config: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
    }).compile();

    config = module.get<ConfigService>(ConfigService);
  });

  describe('ConfigService.get(arg)', () => {
    it('should return arg value from .env file', () => {
      expect(config.get('ENV')).toBe('test');
    });
  });
});
