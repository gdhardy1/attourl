import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { UrlController } from './url/url.controller';
import { UrlModule } from './url/url.module';

@Module({
  imports: [ConfigModule, UrlModule],
  controllers: [AppController, UrlController],
  providers: [AppService],
})
export class AppModule {}
