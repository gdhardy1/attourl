import { CreateUrlDto } from '../dto/createUrl.dto';

export class MockUrlModel {
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
