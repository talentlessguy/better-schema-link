import { ApolloLink, Observable, Operation } from '@apollo/client'
import { GraphQLSchema } from 'graphql'
import { execute } from 'graphql/execution/execute'

export class SchemaLink<Context = any> extends ApolloLink {
  schema: GraphQLSchema
  rootValue: any
  context: any

  constructor({ schema, rootValue, context }: { schema: GraphQLSchema; rootValue: any; context: Context }) {
    super()

    this.schema = schema
    this.rootValue = rootValue
    this.context = context
  }

  async _execute(operation: Operation) {
    const contextValue = typeof this.context === 'function' ? await this.context(operation) : this.context

    return execute(
      this.schema,
      operation.query,
      this.rootValue,
      contextValue,
      operation.variables,
      operation.operationName
    )
  }

  request(operation: Operation) {
    return new Observable((observer) => {
      Promise.resolve(this._execute(operation))
        .then((data) => {
          if (!observer.closed) {
            observer.next(data)
            observer.complete()
          }
        })
        .catch((error) => {
          if (!observer.closed) {
            observer.error(error)
          }
        })
    })
  }
}
