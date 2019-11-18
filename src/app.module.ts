import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { UrlModule } from './url/url.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './config/config.service';
import { UrlService } from './url/url.service';
import { FileMiddleware } from './file/file.middleware';

const config = new ConfigService(
  `${process.env.NODE_ENV || 'development'}.env`,
);

@Module({
  imports: [
    MongooseModule.forRoot(config.get('MONGODB_URI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    ConfigModule,
    UrlModule,
  ],
  controllers: [AppController],
  providers: [AppService, UrlService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FileMiddleware).forRoutes(AppController);
  }
}
