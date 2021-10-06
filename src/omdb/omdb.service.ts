import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { MovieAPI } from 'src/movies/movieAPI';


@Injectable()
export class OmdbService {
    constructor(
        private http: HttpService
    ) {}
    async fetch(search:string):Promise<MovieAPI>{
        let apiURL = `http://www.omdbapi.com/?apikey=${process.env.APIKEY}&t=${search}`;
        return await firstValueFrom(this.http.get(apiURL).pipe(map(res => res.data)));
    }
}     

