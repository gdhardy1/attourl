import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Url } from './interfaces/url.interface';
import { CreateUrlDto } from './dto/createUrl.dto';
import { ConfigService } from '../config/config.service';
import * as shortid from 'shortid';
import * as urlParse from 'url-parse';

@Injectable()
export class UrlService {
  private BASE_URL: string;

  constructor(
    private readonly config: ConfigService,
    @InjectModel('Url') private readonly urlModel: Model<Url>,
  ) {}

  shorten(longUrl): CreateUrlDto {
    let urlCode: string = shortid.generate();
    let shortUrl: string = this.config.get('BASE_URL') + `/${urlCode}`;
    let date: string = new Date(Date.now()).toString();
    let data: CreateUrlDto = { urlCode, longUrl, shortUrl, date };

    longUrl = this.applyProtocol(longUrl);

    this.create(data);

    return data;
  }

  applyProtocol(url) {
    let parsed = urlParse(url);

    if (parsed.protocol === '') return 'http://' + url;

    return url;
  }

  async create(createUrlDto: CreateUrlDto): Promise<Url> {
    const newUrl = new this.urlModel(createUrlDto);
    return await newUrl.save();
  }
}
