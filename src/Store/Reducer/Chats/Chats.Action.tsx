import { loadMessageAPI, loadMessageAPIGraphql } from './Chats.Services'
import jwt from 'jsonwebtoken'
import { gql, useQuery, useMutation, ApolloClient, InMemoryCache } from '@apollo/client'
import client from '@Apolo/index'

interface IACTION_CHATS {
  ADD_USER_CHAT: string
  SET_CONTENT_CHAT: string
}

export const ACTION_CHATS: IACTION_CHATS = {
  ADD_USER_CHAT: 'ADD_USER_CHAT',
  SET_CONTENT_CHAT: 'SET_CONTENT_CHAT',
}
export const AddUserChat = (itemUser: any) => {
  return async function(dispatch: any, getState: any) {
    dispatch({ type: ACTION_CHATS.ADD_USER_CHAT, payload: itemUser })
    const jwtToken = localStorage.getItem('jwtToken')
    const { id } = JSON.parse(JSON.stringify(jwt.decode(jwtToken)))

    try {
      client
        .query({
          query: gql`
            query GetMessages {
              messages(id: "${id}", idUser: "${itemUser._id}") {
                content
                  _id
                  like
                  isSend
                  userSend {
                    name
                    image
                    _id
                  }
                }
            }
          `,
        })
        .then((result: any) => {
          dispatch({
            type: ACTION_CHATS.SET_CONTENT_CHAT,
            payload: {
              data: result.data.messages,
              idUser: itemUser._id,
            },
          })
        })
    } catch (err) {
      // dispatch(getMarketFailed());
      // dispatch({ type: ACTION_LOGIN.LOADING })
    }
  }
}
export const AddNewMessage = (text: string, idUser: any) => {
  return async function(dispatch: any, getState: any) {
    // dispatch({ type: ACTION_CHATS.ADD_USER_CHAT, payload: itemUser })
    const jwtToken = localStorage.getItem('jwtToken')
    const { id } = JSON.parse(JSON.stringify(jwt.decode(jwtToken)))
    console.log(text)
    console.log(idUser)
    console.log(id)
    const CREATE_MESSAGE = gql`
      mutation CreateMessages($text: String!, $id: String!, $idUser: String!) {
        createMessage(text: $text, id: $id, idUser: $idUser) {
          content
        }
      }
    `
    // try {
    const [createMessage] = useMutation(CREATE_MESSAGE)
    createMessage({ variables: { text, id, idUser } }).then(result => {
      console.log(result)
    })
    // client
    //   .mutation({
    //     mutation: gql`
    //         mutation CreateMessages() {
    //           createMessage(text: "${text}", id: "${id}", idUser: "${idUser}") {
    //             content
    //               _id
    //               like
    //               isSend
    //               // userSend {
    //               //   name
    //               //   image
    //               //   _id
    //               // }
    //             }
    //         }
    //       `,
    //   })
    //   .then((result: any) => {
    //     console.log(result)

    // dispatch({
    //   type: ACTION_CHATS.SET_CONTENT_CHAT,
    //   payload: {
    //     data: result.data.messages,
    //     idUser: itemUser._id,
    //   },
    // })
    // })
    // } catch (err) {
    //   // dispatch(getMarketFailed());
    //   // dispatch({ type: ACTION_LOGIN.LOADING })
    // }
  }
}
