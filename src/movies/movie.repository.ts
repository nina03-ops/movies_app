import { Repository, EntityRepository } from 'typeorm';
import { Movie } from './entities/movie.entity';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {}
