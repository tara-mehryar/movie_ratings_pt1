import { Model, DataTypes } from 'sequelize';
import util from 'util';
import connectToDB from './db.js';

export const db = await connectToDB('postgresql:///ratings');

export class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

export class Movie extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Movie.init(
  {
    movieId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    overview: {
      type: DataTypes.TEXT,
    },
    releaseDate: {
      type: DataTypes.DATE,
    },
    posterPath: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: 'movie',
    sequelize: db,
  },
);

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'user',
    sequelize: db,
  },
);

await db.sync({ force: true })

const testUser = await User.create({ email: 'test@email.com', password: 'test' });
const testMovie = await Movie.create ({ title: 'Interstellar' });

console.log(testUser);
console.log(testMovie);
