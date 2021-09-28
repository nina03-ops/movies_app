require('dotenv').config();


import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import * as connectionOptions from './ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports: [
    MoviesModule,
    TypeOrmModule.forRoot({...connectionOptions, autoLoadEntities: true})
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
