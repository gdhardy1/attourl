import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/createUrl.dto';
import { ConfigModule } from '../config/config.module';
import { getModelToken } from '@nestjs/mongoose';
import { MockUrlModel } from './schemas/url.mock';

describe('UrlService', () => {
  let service: UrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        UrlService,
        {
          provide: getModelToken('Url'),
          useValue: MockUrlModel,
        },
      ],
    }).compile();

    service = module.get<UrlService>(UrlService);
  });

  describe('shorten(url)', () => {
    let longUrl: string = 'http://google.com';

    it('should return an object in the shape of CreateUrlDto', () => {
      expect(service.shorten(longUrl)).toMatchObject(new CreateUrlDto());
    });
  });

  describe('applyProtocol(url)', () => {
    let regex: RegExp = new RegExp('^http://(?!=http://)');

    it.each`
      string   | url                 | expected
      ${''}    | ${'ab.cde'}         | ${true}
      ${'not'} | ${'ftp://ab.cde'}   | ${false}
      ${'not'} | ${'https://ab.cde'} | ${false}
      ${'not'} | ${'http://ab.cde'}  | ${true}
    `('should $string apply http protocol to $url', ({ url, expected }) => {
      expect(regex.test(service.applyProtocol(url))).toBe(expected);
    });
  });
});
