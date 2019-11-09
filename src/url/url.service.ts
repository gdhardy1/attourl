import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Url } from './interfaces/url.interface';
import { CreateUrlDto } from './dto/createUrl.dto';
import { ConfigService } from '../config/config.service';

@Injectable()
export class UrlService {
  private BASE_URL: string;

  constructor(
    private readonly config: ConfigService,
    @InjectModel('Url') private readonly urlModel: Model<Url>,
  ) {}

  shorten(longUrl): CreateUrlDto {
    let urlCode: string = '';
    let shortUrl: string = '';
    let date: string = '';
    let data: CreateUrlDto = { urlCode, longUrl, shortUrl, date };

    return data;
  }

}
