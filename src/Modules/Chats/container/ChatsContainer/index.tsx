import React, { useCallback, useEffect } from 'react'
import styles from './style.module.scss'
import { IChatsContainer } from './ChatsContainer.Interface'
import useMemoSelector from '@Common/useMemoSelector'
import ItemsChatComponent from '@Modules/Chats/components/ItemsChatComponent'
import { gql, useQuery, useSubscription } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { AddNewMessage, CloseUserMessage } from '@Store/Reducer/Chats/Chats.Action'
const { StyleChatsContainer } = styles
import { ApolloProvider } from '@apollo/client'
import client from '@Apolo/index'
import { AddUserChat } from '@Store/Reducer/Chats/Chats.Action'
import jwt from 'jsonwebtoken'
import { COMMENTS_SUBSCRIPTION_CONTAINER } from '@Modules/Chats/Chats.graphql'
const jwtToken = localStorage.getItem('jwtToken')
const { id } = JSON.parse(JSON.stringify(jwt.decode(jwtToken)))
const audio = new Audio(require('@assets/audio/test.mp3').default)

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

  const { data } = useSubscription(COMMENTS_SUBSCRIPTION_CONTAINER, {
    variables: { idUser: id },
  })
  useEffect(() => {
    if (data) {
      const chatFindList = listChat.find(
        (item: any) =>
          item._id == data.newMessage.userSend._id || id == data.newMessage.userSend._id,
      )
      if (!chatFindList) {
        !(id != data.newMessage.userSend._id && id != data.newMessage.userReceive._id) &&
          dispatch(AddUserChat(data.newMessage.userSend))
      }
      data.newMessage.userSend._id !== id &&
        audio
          .play()
          .then(() => {
            console.log('thanh cong')
          })
          .catch(() => {
            console.log('that bai')
          })
    }
  }, [data])

  const handleCloseUserChat = useCallback(
    item => {
      dispatch(CloseUserMessage(item._id))
    },
    [listChat, data],
  )
  return (
    <div className={`${StyleChatsContainer}`}>
      {listChat.map((itemChat: any, index: number) => (
        <ItemsChatComponent itemChat={itemChat} key={index} closeUserChat={handleCloseUserChat} />
      ))}
    </div>
  )
}

export default ChatsContainer
