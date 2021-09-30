require('dotenv').config();

import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import * as connectionOptions from './ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './common/auth.middleware';
@Module({
  imports: [
    MoviesModule,
    TypeOrmModule.forRoot({...connectionOptions, autoLoadEntities: true})
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {  
  public configure(consumer: MiddlewareConsumer) {
  consumer
    .apply(AuthMiddleware)
    .forRoutes('movies');
  }}
