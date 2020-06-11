const { ApolloServer, gql } = require('apollo-server');

const data = require('./data/pokemon.json');

const typeDefs = gql`
  """
  Height of the pokemon, ranges between a minimum and maximum value
  """
  type Height {
    minimum: String
    maximum: String
  }

  """
  Weight of the pokemon, ranges between a minimum and maximum value
  """
  type Weight {
    minimum: String
    maximum: String
  }

  """
  Details of the evolution, ID can be used for further queries
  """
  type Evolution {
    id: ID!
    imgSrc: String
    name: String
  }

  type Pokemon {
    """
    Definiting trait of the Pokemon e.g. "Seed Pokémon"
    """
    classification: String
    """
       All eventual evolutions of the pokemon, should be ordered by sequence

    e.g. [B, C] - A > B > C
    """
    evolutions: [Evolution]
    height: Height
    """
       ID as in Pokedex

    e.g. "050"
    """
    id: ID!
    imgSrc: String
    name: String
    resistances: [String]
    types: [String]
    weaknesses: [String]
    weight: Weight
  }

  type Query {
    pokemon: [Pokemon]!
    """
       Provide full ID as in Pokedex including leading zeros

    e.g. id: "003"
    """
    pokemonById(id: String!): [Pokemon]!
    """
       Provide full or partial name, will return partial matches (not case sensitive)

    e.g. name: "pika"
    """
    pokemonByName(name: String!): [Pokemon]!
    """
       Provide type (not case sensitive)

    e.g. type: "poison"
    """
    pokemonByType(type: String!): [Pokemon]!
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
          return type.toLowerCase() === params.type.toLowerCase();
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
