import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Param,
  Redirect,
  Get,
} from '@nestjs/common';

import { UrlService } from './url.service';

import { ShortenUrlDto } from './dto/shortenUrl.dto';

@Controller('/api/url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('/shorten')
  async shorten(
    @Body(new ValidationPipe()) shortenUrlDto: ShortenUrlDto,
  ): Promise<object> {
    return await this.urlService.shorten(shortenUrlDto.longUrl);
  }
}
