import React, { useCallback } from 'react'
import styles from './style.module.scss'
import { IChatsContainer } from './ChatsContainer.Interface'
import useMemoSelector from '@Common/useMemoSelector'
import ItemsChatComponent from '@Modules/Chats/components/ItemsChatComponent'
import { gql, useQuery } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { AddNewMessage } from '@Store/Reducer/Chats/Chats.Action'
const { StyleChatsContainer } = styles
import { ApolloProvider } from '@apollo/client'
import client from '@Apolo/index'
const EXCHANGE_RATES = gql`
  query GetMessages {
    messages(id: "5f587737dc35c91363b5de4b", idUser: "5f56f98a6c5d218580baf6bf") {
      content
    }
  }
`
interface Iprops {}

const ChatsContainer = (props: Iprops) => {
  const dispatch = useDispatch()
  const { listChat } = useMemoSelector('ChatsRuducer', ['listChat'])
  console.log(listChat)
  // const handleNewMessage = useCallback((text: string, idUser: string) => {
  //   dispatch(AddNewMessage(text, idUser))
  // }, [])
  return (
    <div className={`${StyleChatsContainer}`}>
      {listChat.map((itemChat: any, index: number) => (
        <ApolloProvider client={client} key={index}>
          <ItemsChatComponent itemChat={itemChat} />
        </ApolloProvider>
      ))}
    </div>
  )
}

export default ChatsContainer
