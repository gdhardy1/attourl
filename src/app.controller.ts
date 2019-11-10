import { Controller, Get, Redirect, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { UrlService } from './url/url.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly urlService: UrlService,
  ) {}

  @Get('/:code')
  @Redirect('override')
  async getLongUrl(@Param() params): Promise<object> {
    return {
      url: await this.urlService.getLongUrl(params.code),
      statusCode: 302,
    };
  }
}
