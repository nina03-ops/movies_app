import { Module} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { HttpModule } from '@nestjs/axios';
import { MovieRepository } from './movie.repository';

@Module({
  imports: [
    HttpModule, 
    TypeOrmModule.forFeature([Movie, MovieRepository])],
  controllers: [MoviesController],
  providers: [MoviesService]
})
export class MoviesModule {}
