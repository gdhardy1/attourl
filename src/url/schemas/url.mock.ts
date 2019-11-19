import { CreateUrlDto } from '../dto/createUrl.dto';

export class MockUrlModel {
  constructor() {}
  save(): Promise<CreateUrlDto> {
    return new Promise((resolve, reject) => {
      resolve(new CreateUrlDto());
    });
  }

  static async findOne(query: any): Promise<CreateUrlDto> {
    console.log(query.longUrl == 'existing');
    if (query.longUrl == 'existing') {
      return Promise.resolve({
        shortUrl: 'shortUrl',
        longUrl: 'existing',
        urlCode: 'urlCode',
        date: 'date',
      });
    }

    return Promise.resolve(new CreateUrlDto());
  }
}
