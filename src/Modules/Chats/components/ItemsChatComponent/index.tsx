import React, { useCallback, useRef, useEffect } from 'react'
import styles from './style.module.scss'
import { IItemsChatComponent } from './ItemsChatComponent.Interface'
import { gql, useMutation, useQuery } from '@apollo/client'
import jwt from 'jsonwebtoken'
const jwtToken = localStorage.getItem('jwtToken')
const { id } = JSON.parse(JSON.stringify(jwt.decode(jwtToken)))
const {
  Item,
  ItemHeader,
  ItemHeaderUser,
  ItemContent,
  ItemContentRecord,
  ItemContentRecordGroup,
  ItemContentRecordReverd,
  ItemContentRecordImage,
  ItemSendMessage,
} = styles
interface Iprops {
  itemChat: any
}

const GET_MESSAGE = gql`
  query GetMessages($id: String!, $idUser: String!) {
    messages(id: $id, idUser: $idUser) {
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
`
const CREATE_MESSAGE = gql`
  mutation CreateMessages($text: String!, $id: String!, $idUser: String!) {
    createMessage(text: $text, id: $id, idUser: $idUser) {
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
`
const ItemsChatComponent = (props: Iprops) => {
  const refInput = useRef(null)
  const refItemContent = useRef(null)
  const { loading, error, data } = useQuery(GET_MESSAGE, {
    variables: { id, idUser: props.itemChat._id },
  })
  const [createMessage] = useMutation(CREATE_MESSAGE, {
    update(cache, { data: { createMessage } }) {
      cache.modify({
        fields: {
          messages(existingMessages = []) {
            const newTodoRef = cache.writeFragment({
              data: createMessage,
              fragment: gql`
                fragment NewMessage on Message {
                  id
                  type
                }
              `,
            })
            return [...existingMessages, newTodoRef]
          },
        },
      })
    },
  })
  const { itemChat } = props
  const handleNewMessage = (e: any) => {
    createMessage({ variables: { text: e.target.value, id, idUser: itemChat._id } }).then(res => {
      refInput.current.value = ''
      refItemContent.current.scrollIntoView({ block: 'end' })
    })
  }
  useEffect(() => {
    refItemContent.current.scrollIntoView({ block: 'end' })
  }, [data])
  console.log(data)

  return (
    <div className={`${Item}`}>
      <div className={`${ItemHeader}`}>
        <div className={`${ItemHeaderUser}`}>
          <img src={itemChat.image} alt={itemChat.name} />
          <h6>{itemChat.name}</h6>
        </div>
        <i className="fa fa-times" aria-hidden="true"></i>
      </div>
      <div className={`${ItemContent}`}>
        {/* {loading && <div>1234</div>} */}
        {data &&
          data.messages.map((item: any, index: number) => {
            return (
              <div
                className={`${ItemContentRecord} ${item.isSend && ItemContentRecordReverd}`}
                key={index}
              >
                <div className={`${ItemContentRecordImage}`}>
                  {!data.messages[index + 1] ? (
                    <img src={item.userSend.image} alt={item.userSend.name} />
                  ) : (
                    item.userSend._id !== data.messages[index + 1].userSend._id && (
                      <img src={item.userSend.image} alt={item.userSend.name} />
                    )
                  )}
                </div>
                <span>{item.content}</span>
              </div>
            )
          })}
        <div ref={refItemContent} />
      </div>
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
