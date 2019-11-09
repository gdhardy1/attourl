import { Test, TestingModule } from '@nestjs/testing';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { ShortenUrlDto } from './dto/shortenUrl.dto';
import { ConfigModule } from '../config/config.module';
import { getModelToken } from '@nestjs/mongoose';
import { CreateUrlDto } from './dto/createUrl.dto';

describe('Url Controller', () => {
  let urlController: UrlController;
  let urlService: UrlService;

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
      controllers: [UrlController],
    }).compile();

    urlService = module.get<UrlService>(UrlService);
    urlController = module.get<UrlController>(UrlController);
  });

  describe('shorten()', () => {
    it('fulfills contract with UrlService', () => {
      let body: ShortenUrlDto = { longUrl: 'http://www.google.com' };

      let result: CreateUrlDto = new CreateUrlDto();

      const spy = jest.spyOn(urlService, 'shorten').mockImplementation(
        () =>
          new Promise((resolve, reject) => {
            resolve(result);
          }),
      );

      urlController.shorten(body);

      expect(spy).toHaveBeenCalled();
    });
  });
});
