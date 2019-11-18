import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { UrlModule } from './url/url.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './config/config.service';
import { UrlService } from './url/url.service';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

let config = new ConfigService(`${process.env.NODE_ENV || 'development'}.env`);

@Module({
  imports: [
    MongooseModule.forRoot(config.get('MONGODB_URI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    ConfigModule,
    UrlModule,
  ],
  controllers: [AppController],
  providers: [AppService, UrlService],
})
export class AppModule {}
