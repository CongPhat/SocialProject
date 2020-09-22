import { ApolloClient, InMemoryCache, concat } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { split, HttpLink } from '@apollo/client'
import { setContext } from 'apollo-link-context'
import { getMainDefinition } from '@apollo/client/utilities'
// import { createHttpLink } from 'apollo-link-http';

const token = localStorage.getItem('jwtToken')

const httpLink = new HttpLink({
  uri: 'http://192.168.10.243:3000/graphql',
})

const wsLink = new WebSocketLink({
  uri: `ws://192.168.10.243:3000/subscriptions`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: token ? `Bearer ${token}` : '',
    },
  },
})

const authLink: any = setContext((_, { headers }) => {
  // const token = localStorage.getItem('jwtToken')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
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
  link: concat(authLink, splitLink),
})
