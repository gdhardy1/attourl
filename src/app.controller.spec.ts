import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { getModelToken } from '@nestjs/mongoose';
import { UrlService } from './url/url.service';
import { CreateUrlDto } from './url/dto/createUrl.dto';

describe('AppController', () => {
  let appController: AppController;
  let urlService: UrlService;

  class MockUrlModel {
    constructor() {}
    save(): Promise<CreateUrlDto> {
      return new Promise((resolve, reject) => {
        resolve(new CreateUrlDto());
      });
    }

    static findOne(query: object): Promise<CreateUrlDto> {
      return new Promise((resolve, reject) => {
        resolve(new CreateUrlDto());
      });
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
      let code: string = 'myCode';
      let result: CreateUrlDto = new CreateUrlDto();

      const spy = jest.spyOn(urlService, 'getLongUrl').mockImplementation(
        () =>
          new Promise((resolve, reject) => {
            resolve(result);
          }),
      );

      appController.getLongUrl(code);

      expect(spy).toHaveBeenCalled();
    });
  });
});
