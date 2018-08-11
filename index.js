const {ApolloServer, gql} = require('apollo-server');

const pokemon = [
    {
        name: "pikachu"
    }
]

const typeDefs = gql`
  type Monster {
    name: String
  }
  
  type Query {
    pokemon: [Monster]
  }
`;

const resolvers = {
    Query: {
      pokemon: () => pokemon,
    },
  };

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

