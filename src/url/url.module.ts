import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlSchema } from './schemas/url.schema';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: 'Url', schema: UrlSchema }]),
  ],
  controllers: [UrlController],
  providers: [UrlService],
  exports: [MongooseModule, UrlService],
})
export class UrlModule {}
