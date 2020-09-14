import React, { useRef } from 'react'
import styles from './style.module.scss'
import { gql, useMutation, useQuery, useSubscription } from '@apollo/client'
import jwt from 'jsonwebtoken'
import ContentMessageComponent from '../ContentMessageComponent'
const jwtToken = localStorage.getItem('jwtToken')
const { id } = JSON.parse(JSON.stringify(jwt.decode(jwtToken)))

const { Item, ItemHeader, ItemHeaderUser, ItemSendMessage } = styles
interface Iprops {
  itemChat: any
  closeUserChat: (item: any) => void
}

const CREATE_MESSAGE = gql`
  mutation CreateMessages($text: String!, $id: String!, $idUser: String!) {
    createMessage(text: $text, id: $id, idUser: $idUser) {
      content
      _id
      like
      isSend
      date
      userSend {
        name
        image
        _id
      }
      userReceive {
        name
        image
        _id
      }
    }
  }
`

const ItemsChatComponent = (props: Iprops) => {
  const refInput = useRef(null)

  const [createMessage] = useMutation(CREATE_MESSAGE)
  // const [createMessage] = useMutation(CREATE_MESSAGE, {
  //   update(cache, { data: { createMessage } }) {
  //     cache.modify({
  //       fields: {
  //         messages(existingMessages = []) {
  //           const newTodoRef = cache.writeFragment({
  //             data: createMessage,
  //             fragment: gql`
  //               fragment NewMessage on Message {
  //                 id
  //                 type
  //               }
  //             `,
  //           })
  //           return [...existingMessages, newTodoRef]
  //         },
  //       },
  //     })
  //   },
  // })
  const { itemChat } = props
  const handleNewMessage = (e: any) => {
    createMessage({ variables: { text: e.target.value, id, idUser: itemChat._id } }).then(res => {
      refInput.current.value = ''
      // refItemContent.current.scrollIntoView({ block: 'end' })
    })
  }

  return (
    <div className={`${Item}`}>
      {/* <h4>New comment: {!loading && commentAdded.content}</h4> */}
      <div className={`${ItemHeader}`}>
        <div className={`${ItemHeaderUser}`}>
          <img src={itemChat.image} alt={itemChat.name} />
          <h6>{itemChat.name}</h6>
        </div>
        <i
          className="fa fa-times"
          aria-hidden="true"
          onClick={() => props.closeUserChat(itemChat)}
        ></i>
      </div>
      <ContentMessageComponent id={itemChat._id} />
      <div className={`${ItemSendMessage}`}>
        <input
          type="text"
          placeholder="Aa"
          onKeyDown={(e: any) => {
            return e.key === 'Enter' && handleNewMessage(e)
          }}
          ref={refInput}
        />
      </div>
    </div>
  )
}

export default React.memo(ItemsChatComponent)
