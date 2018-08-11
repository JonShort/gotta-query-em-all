const { ApolloServer, gql } = require('apollo-server');

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
  }
`;

const resolvers = {
  Query: {
    pokemon: () => data,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
