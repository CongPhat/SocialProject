import React, { useRef } from 'react'
import styles from './style.module.scss'
import { gql, useMutation, useQuery, useSubscription } from '@apollo/client'
import jwt from 'jsonwebtoken'
import ContentMessageComponent from '../ContentMessageComponent'
import { CREATE_MESSAGE } from '@Modules/Chats/Chats.graphql'
const jwtToken = localStorage.getItem('jwtToken')
const { id } = JSON.parse(JSON.stringify(jwt.decode(jwtToken)))

const { Item, ItemHeader, ItemHeaderUser, ItemSendMessage } = styles
interface Iprops {
  itemChat: any
  closeUserChat: (item: any) => void
}

const ItemsChatComponent = (props: Iprops) => {
  const { itemChat } = props
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
  const handleNewMessage = (e: any) => {
    createMessage({ variables: { text: e.target.value, id, idUser: itemChat._id } }).then(res => {
      refInput.current.value = ''
      document.getElementById('bottomContentMessage').scrollIntoView({ block: 'end' })
      // refItemContent.current.scrollIntoView({ block: 'end' })
    })
  }

  return (
    <div className={`${Item}`}>
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
