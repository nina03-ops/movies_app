import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { MovieRepository } from './movie.repository';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieRepository)
    private repository: MovieRepository,
  ) {}
  
  public async create(createMovie: Movie): Promise<Movie> {
      return await this.repository.save(createMovie);
    }
 
  public async getAll(userId:number): Promise<Movie[]> {
    let foundMovies = this.repository.createQueryBuilder("movie").where("movie.userId = :userId", { userId:userId }).getMany()      
    if (!foundMovies) {
      throw new NotFoundException('Movies not found');
    }
    return foundMovies;
  }

  public async countAll(userId:number, created_at:Date): Promise<number> {
    let countedMovies = this.repository.createQueryBuilder("movie")
      .where("movie.userId = :userId", { userId:userId })
      .orWhere("movie.created_at > :created_at", { created_at:created_at })
      .getCount()
    if (!countedMovies) {
      throw new NotFoundException('Movies not found');
    }
    return countedMovies;
  }

  async findOne(id: number) {
    const foundMovie = await this.repository.findOne(id);
    if (!foundMovie) {
      throw new NotFoundException('Movie not found');
    }
    return foundMovie;
  }
}