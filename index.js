const { ApolloServer, gql } = require('apollo-server');

const data = require('./data/pokemon.json');

const typeDefs = gql`
  type Height {
    minimum: String
    maximum: String
  }

  type Weight {
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
    weight: Weight
    height: Height
    evolutions: [Evolution]
  }

  type Query {
    pokemon: [Monster]!
    pokemonById(id: String!): [Monster]!
    pokemonByName(name: String!): [Monster]!
    pokemonByType(type: String!): [Monster]!
  }
`;

const resolvers = {
  Query: {
    pokemon: () => data,
    pokemonByName: (_, params) => {
      return data.filter((monster) =>
        monster.name.toLowerCase().includes(params.name.toLowerCase())
      );
    },
    pokemonById: (_, params) => {
      return data.filter((monster) => monster.id === params.id);
    },
    pokemonByType: (_, params) => {
      return data.filter((monster) => {
        return monster.types.some((type) => {
          return type.toLowerCase().includes(params.type.toLowerCase());
        });
      });
    },
  },
};

const server = new ApolloServer({
  introspection: true,
  playground: true,
  resolvers,
  typeDefs,
});

const PORT = process.env.PORT || 4000;

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
