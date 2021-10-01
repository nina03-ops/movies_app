import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { REQUEST } from '@nestjs/core';
import { MovieAPI } from './movieAPI';
import { MovieDto } from './dto/movie.dto';

describe('MoviesController', () => {
  let movieService: MoviesService;
  let movieController: MoviesController;
  const mockMovieService = () => ({
    create: jest.fn(),
    getAll: jest.fn(),
    countAll: jest.fn(),
    fetch: jest.fn()
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[],
      providers: [
        MoviesController,
        {
          provide: MoviesService,
          useFactory: mockMovieService,
        },
        {
          provide: REQUEST,
          useValue: {
             user: {
              "userId": 123,
              "name": "Basic Thomas",
              "role": "basic",
              "iat": 1606221838,
              "exp": 1606223638,
              "iss": "https://www.netguru.com/",
              "sub": "123"
            },
          },
        },
      ],
    }).compile();

    movieController = module.get<MoviesController>(MoviesController);
    movieService = await module.get<MoviesService>(MoviesService);
  });

  describe('postMovie', () => {
    it('should save a movie in the database', async () => {
      const movieFromOmdbApi: MovieAPI = {
        Title: "title",
        Released: new Date("1994-09-21T21:00:00.000Z"),
        Genre: "genre",
        Director: "director"
      }
      Object(movieService.fetch).mockResolvedValue(movieFromOmdbApi);

      const savedMovie:Movie = {
        id: 1,
        title: 'Friends',
        released: new Date('1994-09-21T21:00:00.000Z'),
        genre: 'Comedy, Romance',
        director: "N/A",
        userId: 123,
        created_at: new Date("2021-10-01")
      };
      Object(movieService.create).mockResolvedValue(savedMovie);

      const createDto: CreateMovieDto = {
        title: 'Friends'
      }
      const result = await movieController.create(createDto);
      
      const movieDto: MovieDto = {
        id: 1,
        title: 'Friends',
        released: new Date('1994-09-21T21:00:00.000Z'),
        genre: 'Comedy, Romance',
        director: "N/A",
        userId: 123,
      }
      expect(result).toEqual(movieDto);
    });
  });

  describe('getMovies', () => {
    const savedMovie:Movie = {
      id: 1,
      title: 'Friends',
      released: new Date('1994-09-21T21:00:00.000Z'),
      genre: 'Comedy, Romance',
      director: "N/A",
      userId: 123,
      created_at: new Date("2021-10-01")
    };
    it('should get all movies', async () => {
      Object(movieService.getAll).mockResolvedValue(savedMovie);
      const result = await movieService.getAll(savedMovie.userId);
      expect(result).toEqual(savedMovie);
    });
  });
});
