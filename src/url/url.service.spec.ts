import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/createUrl.dto';
import { ConfigModule } from '../config/config.module';
import { getModelToken } from '@nestjs/mongoose';

xdescribe('UrlService', () => {
  let service: UrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        UrlService,
        {
          provide: getModelToken('Url'),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UrlService>(UrlService);
  });

  describe('shorten(url)', () => {
    let longUrl = 'http://google.com';

    it('should return an object in the shape of CreateUrlDto', () => {
      expect(service.shorten(longUrl)).toMatchObject(new CreateUrlDto());
    });
  });
});
