import { Controller, Get, Post, Body, Inject, UnauthorizedException, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';
import { MovieDto } from './dto/movie.dto';
import { REQUEST } from '@nestjs/core';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('movies')
@ApiBearerAuth('token')
export class MoviesController {
  constructor(
    @Inject(REQUEST) private request,
    private readonly moviesService: MoviesService) {}

  @Post('create')
  public async create(@Body() createMovieDto: CreateMovieDto) {
    const tokenUser = this.request.user;
    const fetchedMovie = await this.moviesService.fetch(createMovieDto.title);
    const movie = new Movie();
    movie.title = fetchedMovie.Title;
    movie.released = fetchedMovie.Released;
    movie.genre = fetchedMovie.Genre;
    movie.director = fetchedMovie.Director;
    movie.userId = tokenUser.userId;
    var myPastDate=new Date();
    myPastDate.setDate(myPastDate.getDate() - 30);
    if (tokenUser.role === "basic" && (await this.moviesService.countAll(tokenUser.userId, myPastDate)) >= 5){
      throw new UnauthorizedException('User with basic role can save max 5 movies per month.');
    }
    const savedMovie = await this.moviesService.create(movie);
    const movieDto = new MovieDto();
    movieDto.id = savedMovie.id;
    movieDto.title = savedMovie.title;
    movieDto.released = savedMovie.released;
    movieDto.genre = savedMovie.genre;
    movieDto.director = savedMovie.director;
    movieDto.userId = tokenUser.userId;
    return movieDto;
  }

  @Get()
  findAll() {
    const tokenUser = this.request.user;
    return this.moviesService.getAll(tokenUser.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

}

