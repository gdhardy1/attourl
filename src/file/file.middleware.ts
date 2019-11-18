import { Injectable, NestMiddleware } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class FileMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const filepath: string = join(
      __dirname,
      '../../client',
      `${req.params.code}`,
    );

    if (req.params.code && fs.existsSync(filepath)) {
      res.sendFile(filepath);
      return;
    }

    next();
  }
}
