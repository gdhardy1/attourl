import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { getModelToken } from '@nestjs/mongoose';
import { UrlService } from './url/url.service';
import { CreateUrlDto } from './url/dto/createUrl.dto';
import { MockUrlModel } from './url/schemas/url.mock';

describe('AppController', () => {
  let appController: AppController;
  let urlService: UrlService;

  class MockRes {
    sendStatus(message) {
      return message;
    }
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [AppController],
      providers: [
        AppService,
        UrlService,
        {
          provide: getModelToken('Url'),
          useValue: MockUrlModel,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    urlService = app.get<UrlService>(UrlService);
  });

  describe('getLongUrl(urlCode)', () => {
    it('fulfills contract with UrlService', () => {
      const code: string = 'myCode';
      const result: CreateUrlDto = new CreateUrlDto();

      const spy = jest.spyOn(urlService, 'getLongUrl').mockImplementation(
        () =>
          new Promise((resolve, reject) => {
            resolve(result);
          }),
      );

      appController.getLongUrl(new MockRes(), { code });

      expect(spy).toHaveBeenCalled();
    });
  });
});
