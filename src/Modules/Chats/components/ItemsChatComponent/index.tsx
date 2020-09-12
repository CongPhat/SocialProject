import React, { useCallback, useRef, useEffect, useState } from 'react'
import styles from './style.module.scss'
import { IItemsChatComponent } from './ItemsChatComponent.Interface'
import { gql, useMutation, useQuery, useSubscription } from '@apollo/client'
import jwt from 'jsonwebtoken'
import { Link } from 'react-router-dom'
var dateFormat = require('dateformat')
import { Tooltip, Button } from 'antd'
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
      date
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
      date
      userSend {
        name
        image
        _id
      }
    }
  }
`

const COMMENTS_SUBSCRIPTION = gql`
  subscription OnCommentAdded {
    newMessage {
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
    }
  }
`

const ItemsChatComponent = (props: Iprops) => {
  const { data } = useSubscription(COMMENTS_SUBSCRIPTION)
  const { ...resultQuery } = useQuery(GET_MESSAGE, {
    variables: { id, idUser: props.itemChat._id },
  })
  console.log(resultQuery)

  const [dataCurrent, setDataCurrent] = useState<Array<any>>([])
  const refInput = useRef(null)
  const refItemContent = useRef(null)
  useEffect(() => {
    if (resultQuery.data) {
      const convertTime = resultQuery.data.messages.map((item: any) => {
        return {
          ...item,
          date: dateFormat(new Date(parseInt(item.date)), 'dd/mm/yyyy HH:MM'),
        }
      })
      // var date = new Date(1599904382712)
      // console.log(date)

      setDataCurrent(convertTime)
    }
  }, [resultQuery.data])
  useEffect(() => {
    if (data) {
      console.log(data)

      setDataCurrent(pre => [
        ...pre,
        {
          ...data.newMessage,
          date: dateFormat(new Date(parseInt(data.newMessage.date)), 'dd/mm/yyyy HH:MM'),
        },
      ])
    }
  }, [data])

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
      refItemContent.current.scrollIntoView({ block: 'end' })
    })
  }
  useEffect(() => {
    refItemContent.current.scrollIntoView({ block: 'end' })
  }, [dataCurrent])

  return (
    <div className={`${Item}`}>
      {/* <h4>New comment: {!loading && commentAdded.content}</h4> */}
      <div className={`${ItemHeader}`}>
        <div className={`${ItemHeaderUser}`}>
          <img src={itemChat.image} alt={itemChat.name} />
          <h6>{itemChat.name}</h6>
        </div>
        <i className="fa fa-times" aria-hidden="true"></i>
      </div>
      <div className={`${ItemContent}`}>
        {/* {loading && <div>1234</div>} */}
        {dataCurrent.length > 0 &&
          dataCurrent.map((item: any, index: number) => {
            return (
              <div
                className={`${ItemContentRecord} ${item.isSend == id && ItemContentRecordReverd}`}
                key={index}
              >
                <div className={`${ItemContentRecordImage}`}>
                  {!dataCurrent[index + 1] ? (
                    <Tooltip
                      placement={item.isSend == id ? 'right' : 'left'}
                      title={item.userSend.name}
                    >
                      <Link to={`/user/${item.userSend._id}`}>
                        <img src={item.userSend.image} alt={item.userSend.name} />
                      </Link>
                    </Tooltip>
                  ) : (
                    item.userSend._id !== dataCurrent[index + 1].userSend._id && (
                      <Tooltip
                        placement={item.isSend == id ? 'right' : 'left'}
                        title={item.userSend.name}
                      >
                        <Link to={`/user/${item.userSend._id}`}>
                          <img src={item.userSend.image} alt={item.userSend.name} />
                        </Link>
                      </Tooltip>
                    )
                  )}
                </div>
                <Tooltip placement={item.isSend == id ? 'right' : 'left'} title={item.date}>
                  <span>{item.content}</span>
                </Tooltip>
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
