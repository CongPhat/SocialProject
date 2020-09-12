import { ApolloClient, InMemoryCache } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { split, HttpLink } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'

const httpLink = new HttpLink({
  uri: 'http://192.168.10.243:3000/graphql',
})

const wsLink = new WebSocketLink({
  uri: `ws://192.168.10.243:3000/subscriptions`,
  options: {
    reconnect: true,
  },
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink,
)

export default new ApolloClient({
  // uri: 'http://192.168.10.243:3000/graphql',
  cache: new InMemoryCache(),
  link: splitLink,
})
