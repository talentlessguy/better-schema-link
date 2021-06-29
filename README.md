<div align="center">
  <img src="https://raw.githubusercontent.com/talentlessguy/better-schema-link/master/logo.svg" height="128px" alt="apollo styled logo" />

# better-schema-link

[![Size badge][size-badge]][bundlephobia] [![NPM][npm-badge]][npm-url]

</div>

Apollo `SchemaLink` with context support. Useful for Next.js apps with universal Apollo GraphQL client that require context (for example field authorization).

## Install

```sh
pnpm i better-schema-link @apollo/client graphql
```

## Example

```ts
import { ApolloClient, InMemoryCache, ApolloLink, ServerError } from '@apollo/client'

const createIsomorphLink = () => {
  if (typeof window === 'undefined') {
    // Works on the server
    const { SchemaLink } = require('better-schema-link')
    const { schema } = require('../graphql/schema')
    const context = require('../graphql/context')
    return new SchemaLink({ schema, context })
  } else {
    // Works on the client
    const { HttpLink } = require('@apollo/client/link/http')

    return new HttpLink({
      uri: '/api/graphql',
      credentials: 'same-origin'
    })
  }
}

// Now your client works on both server and client!
export const createApolloClient = () =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(),
    cache: new InMemoryCache()
  })
```

[size-badge]: https://img.shields.io/bundlephobia/min/better-schema-link?style=for-the-badge&color=B28FB5
[bundlephobia]: https://bundlephobia.com/package/better-schema-link
[npm-badge]: https://img.shields.io/npm/v/better-schema-link?style=for-the-badge&color=B28FB5
[npm-url]: https://npmjs.com/package/better-schema-link
