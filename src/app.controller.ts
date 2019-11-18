import { Controller, Get, Redirect, Param, Res, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { UrlService } from './url/url.service';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly urlService: UrlService,
  ) {}

  @Get()
  index(@Res() res) {
    res.sendFile(join(__dirname, '../client/index.html'));
  }

  @Get('/:code')
  async getLongUrl(@Res() res, @Param() params): Promise<object> {
    const response = await this.urlService.getLongUrl(params.code);
    if (response.longUrl) {
      res.redirect(302, response.longUrl);
    } else {
      res.sendStatus(404);
    }

    return response;
  }
}
