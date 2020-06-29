const { ApolloServer, gql } = require('apollo-server');

const data = require('./data/pokemon.json');

const types = gql`
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

  type Pokemon {
    """
    Definiting trait of the Pokemon e.g. "Seed Pokémon"
    """
    classification: String
    """
       All eventual evolutions of the pokemon, should be ordered by sequence

    e.g. [B, C] - A > B > C
    """
    evolutions: [Pokemon]
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
`;

const queries = gql`
  type Query {
    pokemon: [Pokemon]!
    """
       Provide full ID as in Pokedex including leading zeros

    e.g. id: "003"
    """
    pokemonById(id: String!): Pokemon

    """
       Provide full or partial name, will return all matches (not case sensitive)

    e.g. name: "pika"
    """
    pokemonByPartialName(name: String!): [Pokemon]!

    """
       Provide name (not case sensitive)

    e.g. name: "pikachu"
    """
    pokemonByName(name: String!): Pokemon

    """
       Provide type, will return all matches (not case sensitive)

    e.g. type: "poison"
    """
    pokemonByType(type: String!): [Pokemon]!
  }
`;

const typeDefs = gql`
  ${types}
  ${queries}
`;

const resolvers = {
  Pokemon: {
    evolutions: ({ evolutions }) => {
      if (!evolutions) {
        return [];
      }

      return evolutions.map((ev) => data.find((d) => d.id === ev.id));
    },
  },
  Query: {
    pokemon: () => data,
    pokemonByName: (_, params) => {
      return data.find(
        (monster) => monster.name.toLowerCase() === params.name.toLowerCase()
      );
    },
    pokemonByPartialName: (_, params) => {
      return data.filter((monster) =>
        monster.name.toLowerCase().includes(params.name.toLowerCase())
      );
    },
    pokemonById: (_, params) => {
      return data.find((monster) => monster.id === params.id);
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

const resolveCorsOptions = () => {
  if (!process.env.CORS_ORIGIN) {
    return {};
  }

  return {
    cors: {
      allowedHeaders: 'Content-Type,Authorization',
      methods: 'POST',
      origin: new RegExp(process.env.CORS_ORIGIN),
    },
  };
};

const server = new ApolloServer({
  ...resolveCorsOptions(),
  introspection: true,
  playground: true,
  resolvers,
  typeDefs,
});

const PORT = process.env.PORT || 4000;

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
