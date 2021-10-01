require('dotenv').config();

import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import * as connectionOptions from './ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './common/auth.middleware';
import { MovieRepository } from './movies/movie.repository';
@Module({
  imports: [
    MoviesModule,
    TypeOrmModule.forFeature([MovieRepository]),
    TypeOrmModule.forRoot({...connectionOptions, autoLoadEntities: true})
  ],
  controllers: [],
  providers: []
})
export class AppModule {  
  public configure(consumer: MiddlewareConsumer) {
  consumer
    .apply(AuthMiddleware)
    .forRoutes('movies');
  }}
