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

export class Rating extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

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

Rating.init(
  {
    ratingId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    modelName: 'rating',
    sequelize: db,
    timestamps: true,
    updatedAt: false,
  },
);

await db.sync({ force: true })

const testUser = await User.create({ email: 'test@email.com', password: 'test' });
const testMovie = await Movie.create ({ title: 'Interstellar' });
const testRating = await Rating.create ({ score: 10 });

console.log(testUser);
console.log(testMovie);
console.log(testRating);
