import { FileMiddleware } from './file.middleware';

describe('FileMiddleware', () => {
  it('should be defined', () => {
    expect(new FileMiddleware()).toBeDefined();
  });
});
