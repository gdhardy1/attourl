import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { UrlService } from '../src/url/url.service';

import { CreateUrlDto } from '../src/url/dto/createUrl.dto';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  class MockUrlService {
    constructor() {}
    async getLongUrl(code: string): Promise<object> {
      const documents: object = {
        testCode1: 'http://google.com',
        testCode2: 'http://youtube.com',
      };

      return await Promise.resolve({ longUrl: documents[code] });
    }

    async shorten(body) {
      const data: CreateUrlDto = {
        urlCode: '',
        longUrl: '',
        shortUrl: '',
        date: '',
      };
      return await Promise.resolve(data);
    }
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UrlService)
      .useValue(new MockUrlService())
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/:code (GET)', () => {
    it.each([
      ['testCode1', 'http://google.com'],
      ['testCode2', 'http://youtube.com'],
    ])('/%s should redirect to %s', async (code, expected) => {
      try {
        const res = await request(app.getHttpServer())
          .get(`/${code}`)
          .expect(302)
          .expect('location', expected);

        expect(res.redirect).toBeTruthy();

        return res;
      } catch (e) {
        throw e;
      }
    });

    it('should return 404 not found if no document found', async () => {
      await request(app.getHttpServer())
        .get('/testCode3')
        .expect(404);
    });
  });

  describe('/api/url/shorten POST', () => {
    it('should return 201 created and CreateUrlDto object', async () => {
      try {
        const res = await request(app.getHttpServer())
          .post(`/api/url/shorten`)
          .send({ longUrl: 'http://google.com' })
          .expect(201);

        expect(res.body).toMatchObject({
          longUrl: '',
          shortUrl: '',
          urlCode: '',
          date: '',
        });
        return res;
      } catch (e) {
        throw e;
      }
    });
  });
});
