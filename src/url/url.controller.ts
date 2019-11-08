import { Controller, Post, Body, Param, Redirect, Get } from '@nestjs/common';

import { UrlService } from './url.service';

import { ShortenUrlDto } from './dto/shortenUrl.dto';

@Controller('/api/url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('/shorten')
  shorten(@Body() shortenUrlDto: ShortenUrlDto): object {
    return {};
  }
}
