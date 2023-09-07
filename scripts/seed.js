import { Movie,Rating,User,db } from '../src/model.js';
import movieData from './data/movies.json' assert { type: 'json' };

console.log('Syncing database...')
await db.sync({ force: true })

console.log('Seeding database...')

const moviesInDb = await Promise.all (
    movieData.map( async(movie) => {
        const releaseData = new Date(Date.parse(movie.releaseDate));
        const { title, overview, posterPath } = movie;

        const newMovie = await Movie.create({
            title,
            overview,
            posterPath,
            releaseData,
        });

        return newMovie;
})
)

const usersToCreate = []
for (let i = 0; i < 10; i++){
    usersToCreate.push(await User.create({ email: `test${i}@mail.com`, password: 'test' }))
}

const usersInDb = await Promise.all(usersToCreate)

console.log(moviesInDb);
console.log(usersInDb);

await db.close()
console.log('Finished seeding database.');
