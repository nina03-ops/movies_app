import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { map } from 'rxjs/operators';
import { Movie } from './entities/movie.entity';
import { firstValueFrom } from 'rxjs';
import { MovieAPI } from './movieAPI';
import { MovieRepository } from './movie.repository';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieRepository)
    private repository: MovieRepository,
    private http: HttpService
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

  async fetch(search:string):Promise<MovieAPI>{
    let apiURL = `http://www.omdbapi.com/?apikey=${process.env.APIKEY}&t=${search}`;
    return await firstValueFrom(this.http.get(apiURL).pipe(map(res => res.data)));
  }
}