import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { MovieRepository } from './movie.repository';
import { Movie } from './entities/movie.entity';
import { HttpModule, HttpService } from '@nestjs/axios';

describe('MovieService', () => {
  let movieService: MoviesService;
  let movieRepository;
  let httpService: HttpService;
  const mockMovieRepository = () => ({
    save: jest.fn(),
    getAll: jest.fn()
  });

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
      ],
      providers: [
        MoviesService,
        {
          provide: MovieRepository,
          useFactory: mockMovieRepository,
        },
      ],
    }).compile();
    movieService = await module.get<MoviesService>(MoviesService);
    movieRepository = await module.get<MovieRepository>(MovieRepository);
    httpService = await module.get<HttpService>(HttpService);

  });

  describe('createMovie', () => {
    it('should save a movie in the database', async () => {
      const movie: Movie = {
        id: 1,
        title: 'Friends',
        released: new Date('1994-09-21T21:00:00.000Z'),
        genre: 'Comedy, Romance',
        director: "N/A",
        userId: 123
      };

      movieRepository.save.mockResolvedValue(movie);
      expect(movieRepository.save).not.toHaveBeenCalled();

      const result = await movieService.create(movie);
      expect(movieRepository.save).toHaveBeenCalledWith(
        movie,
      );
      expect(result).toEqual(movie);
    });
  });

  // describe('getMovies', () => {
  //   const movie: Movie = {
  //     id: 1,
  //     title: 'Friends',
  //     released: new Date('1994-09-21T21:00:00.000Z'),
  //     genre: 'Comedy, Romance',
  //     director: "N/A",
  //     userId: 123
  //   };
  //   it('should get all movies', async () => {
  //     movieRepository.getAll.mockResolvedValue(movie);
  //     expect(movieRepository.getAll).not.toHaveBeenCalled();
  //     const result = await movieService.getAll(movie.userId);
  //     expect(movieRepository.getAll).toHaveBeenCalled();
  //     expect(result).toEqual(movie);
  //   });
  // });
});

