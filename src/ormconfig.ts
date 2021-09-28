import { ConnectionOptions } from 'typeorm'
import { Movie } from './movies/entities/movie.entity'

const config = {
  host: process.env.POSTGRES_DBHOST,
  user: process.env.POSTGRES_DBUSERNAME,     
  password: process.env.POSTGRES_DBPASS,
  database: process.env.POSTGRES_DBNAME,
}

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: config.host,
  port: 5432,
  username: config.user,
  password: config.password,
  database: config.database,
  entities: [Movie],
  synchronize: true,
  logging: true,
  // ssl: true
}


export = connectionOptions