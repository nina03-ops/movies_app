import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { map } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { firstValueFrom } from 'rxjs';
import { MovieAPI } from './movieAPI';

@Injectable()
export class MoviesService {
  constructor( 
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    private http: HttpService
    ){}
  
  public async create(createMovie: Movie): Promise<Movie> {
      return await this.moviesRepository.save(createMovie);
    }
 
  public async getAll(): Promise<Movie[]> {
    const foundMovies = await this.moviesRepository.find();
    if (!foundMovies) {
      throw new NotFoundException('Movies not found');
    }
    return foundMovies;
  }
 
    async fetch(search:string):Promise<MovieAPI>{
      let apiURL = `http://www.omdbapi.com/?apikey=${process.env.APIKEY}&t=${search}`;
      return await firstValueFrom(this.http.get(apiURL).pipe(map(res => res.data)));
    }
}