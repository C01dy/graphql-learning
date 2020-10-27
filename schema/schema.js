const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const Movies = require('../models/movie');
const Directors = require('../models/director');

const movies = [
  { id: 1, name: 'Snatch', genre: 'Crime, comedy', directorId: 1 },
  {
    id: 1,
    name: 'Lock, Stock and Two Smoking Barrels',
    genre: 'Crime, comedy',
    directorId: 1,
  },
  { id: 2, name: 'Reservoir dogs', genre: 'Crime', directorId: 2 },
  { id: 2, name: 'Pulp fiction', genre: 'Crime', directorId: 2 },
  { id: 2, name: 'Django unchainted', genre: 'Western, drama', directorId: 2 },
  {
    id: 3,
    name: 'Knock on heavens door',
    genre: 'Drama, comedy, crime',
    directorId: 3,
  },
  { id: 4, name: 'Silence of the lambs', genre: 'Thriller', directorId: 4 },
];

const directors = [
  { name: 'Guy Ritchie', age: 52 }, // "5f97dfdc3de544d51ac8d289"
  { name: 'Quentin Tarantino', age: 57 }, // "5f97df4a3de544d51ac8d287"
  { name: 'Thomas Yan', age: 55 }, // "5f97dfaa3de544d51ac8d288"
  { name: 'Jonathan Demme', age: 73 }, // "5f97e0033de544d51ac8d28a"
];

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        // return directors.find((director) => director.id == parent.id);
        return Directors.findById(parent.directorId);
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies.filter((movie) => movie.id == parent.id);
        return Movies.find({ directorId: parent.id });
      },
    },
  }),
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return movies.find((movie) => movie.id == args.id);
        return Movies.findById(args.id)
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return directors.find((director) => director.id == args.id);
        return Directors.findById(args.id)
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies;
        return Movies.find()
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        // return directors;
        return Directors.find()
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});
