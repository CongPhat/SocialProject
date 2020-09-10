import React from 'react'
import styles from './style.module.scss'
import ChatsContainer from './container/ChatsContainer'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
const { chats } = styles
const client = new ApolloClient({
  uri: 'http://192.168.10.243:3000/graphql',
  cache: new InMemoryCache(),
})
const Chats = (props: any) => {
  return (
    <section className={`${chats}`}>
      {/* <ApolloProvider client={client}> */}
      <ChatsContainer />
      {/* </ApolloProvider> */}
    </section>
  )
}
export default React.memo(Chats)
