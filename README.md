# Gotta Query Em All

The first 150 pokemon, as a GraphQL API

Explore the API - https://gotta-query-em-all.herokuapp.com

**Example queries**
```graphql
query allPokemonIds {
  pokemon {
    id
  }
}
```

```graphql
query grassTypes {
  pokemonByType(type: "grass") {
    id
    imgSrc
    name
  }
}
```

```graphql
query PikachuByName {
  pikachu: pokemonByName(name: "pikachu") {
    evolutions {
      id
      imgSrc
			name
    }
    id
    imgSrc
    name
  }
}
```

## Development

_Install dependencies_
```bash
npm install
```

_Run development server (defaults to port 4000)_
```bash
npm run dev
```

_Run development server on different port_
```bash
PORT=2000 npm run dev
```

## Building dockerimage

_Build the image (tagged latest)_
```bash
docker build -t gotta-query-em-all:latest .
```

_Run the container locally_
```bash
docker run -p 4000:4000 gotta-query-em-all:latest
```

_Run the container on a different port_
```bash
docker run -p 2000:2000 -e PORT=2000 gotta-query-em-all:latest
```

## Releasing to heroku

_Login to heroku container registry_
```bash
heroku container:login
```

_Push to heroku container registry_
```bash
heroku container:push web -a PROJECT_NAME
```

_Build args can be provided with --arg_
```bash
heroku container:push web --arg CORS_ORIGIN=localhost:3000 -a PROJECT_NAME
```

_Release to heroku (go live)_
```bash
heroku container:release web -a PROJECT_NAME
```
