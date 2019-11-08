import { IsString, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @IsString()
  readonly urlCode: string;

  @IsUrl()
  readonly longUrl: string;

  @IsString()
  readonly shortUrl: string;

  @IsString()
  readonly date: string;
}
