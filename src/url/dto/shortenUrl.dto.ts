import { IsUrl } from 'class-validator';

export class ShortenUrlDto {
  @IsUrl({
    protocols: ['http', 'https', 'ftp'],
    require_tld: true,
    require_protocol: false,
    require_host: true,
    require_valid_protocol: true,
  })
  readonly longUrl: string;
}
