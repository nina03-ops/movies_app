import { Module} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule, 
    TypeOrmModule.forFeature([Movie])],
  controllers: [MoviesController],
  providers: [MoviesService]
})
export class MoviesModule {}
