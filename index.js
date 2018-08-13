const { ApolloServer, gql } = require('apollo-server');

const playgroundOptions = require('./config/playgroundOptions');
const data = require('./data/pokemon.json');

const typeDefs = gql`
  type Evolutions {
    id: Int
    name: String
  }

  type Monster {
    id: Int
    name: String
    classification: String
    types: [String]
    resistant: [String]
    weaknesses: [String]
    fleeRate: Float
    evolutions: [Evolutions]
    maxCP: Int
  }

  type Query {
    pokemon: [Monster]
    pokemonByName(name: String!): [Monster]
  }
`;

const resolvers = {
  Query: {
    pokemon: () => data,
    pokemonByName: (_, params) => {
      return data.filter(monster =>
        monster.name.toLowerCase().includes(params.name.toLowerCase())
      );
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: playgroundOptions,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
