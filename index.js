const { ApolloServer, gql } = require('apollo-server');

const playgroundOptions = require('./config/playgroundOptions');
const data = require('./data/pokemon.json');

const typeDefs = gql`
  type MinMax {
    minimum: String
    maximum: String
  }

  type Evolution {
    id: ID!
    name: String
  }

  type Monster {
    id: ID!
    name: String
    classification: String
    types: [String]
    resistances: [String]
    weaknesses: [String]
    weight: MinMax
    height: MinMax
    evolutions: [Evolution]
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
