import { ApolloClient, InMemoryCache } from '@apollo/client'
export default new ApolloClient({
  uri: 'http://192.168.10.243:3000/graphql',
  cache: new InMemoryCache(),
})
