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

  async shorten(longUrl): Promise<CreateUrlDto> {
    let urlCode: string = shortid.generate();
    let shortUrl: string = this.config.get('BASE_URL') + `/${urlCode}`;
    let date: string = new Date(Date.now()).toString();
    let data: CreateUrlDto = { urlCode, longUrl, shortUrl, date };

    longUrl = this.applyProtocol(longUrl);

    return await this.create(data);
  }

  applyProtocol(url) {
    let parsed = urlParse(url);

    if (parsed.protocol === '') return 'http://' + url;

    return url;
  }

  async create(createUrlDto: CreateUrlDto): Promise<Url> {
    const newUrl = new this.urlModel(createUrlDto);

    try {
      return await newUrl.save();
    } catch (e) {
      console.log(e);
    }
  }

  async getLongUrl(code): Promise<Url> {
    try {
      let { longUrl } = await this.urlModel.findOne({ urlCode: code });

      return longUrl;
    } catch (e) {
      console.log(e);
    }
  }
}
