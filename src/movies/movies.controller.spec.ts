import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Movie } from './entities/movie.entity';
import { MovieRepository } from './movie.repository';

describe('MoviesController', () => {
  let httpService: HttpService;
  let movieService: MoviesService;
  let controller: MoviesController;
  let movieRepository;
  const mockMovieRepository = () => ({
    save: jest.fn(),
    getAll: jest.fn()
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[HttpModule],
      controllers: [MoviesController],
      providers: [
        MoviesService,
        {
          provide: MovieRepository,
          useFactory: mockMovieRepository,
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    movieService = await module.get<MoviesService>(MoviesService);
    movieRepository = await module.get<MovieRepository>(MovieRepository);
    httpService = await module.get<HttpService>(HttpService);
  });

  describe('postMovie', () => {
    it('should save a movie in the database', async () => {
      const movie:Movie = {
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


  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });
});
