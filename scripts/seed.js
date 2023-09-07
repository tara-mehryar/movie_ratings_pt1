import { Movie,Rating,User,db } from '../src/model.js';
import movieData from './data/movies.json' assert { type: 'json' };

console.log('Syncing database...')
await db.sync({ force: true })

console.log('Seeding database...')


