import { Controller, Get, Post, Body } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';
import { MovieDto } from './dto/movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post('create')
  public async create(@Body() createMovieDto: CreateMovieDto) {
    const fetchedMovie = await this.moviesService.fetch(createMovieDto.title);
    const movie = new Movie();
    movie.title = fetchedMovie.Title;
    movie.released = fetchedMovie.Released
    movie.genre = fetchedMovie.Genre
    movie.director = fetchedMovie.Director
    const savedMovie = await this.moviesService.create(movie);
    const movieDto = new MovieDto();
    movieDto.title = savedMovie.title;
    movieDto.released = savedMovie.released;
    movieDto.genre = savedMovie.genre
    movieDto.director = savedMovie.director
    return movieDto;
  }

  @Get()
  findAll() {
    return this.moviesService.getAll();
  }
}
