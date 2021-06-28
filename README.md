# better-link-schema

Apollo Link Schema with context support. Useful for Next.js apps with universal Apollo GraphQL client.

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
export const createApolloClient = () => new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(),
    cache: new InMemoryCache()
})
```
