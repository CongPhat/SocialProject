import React, { useRef, useState, useEffect } from 'react'
import styles from './style.module.scss'
import { IContentMessageComponent } from './ContentMessageComponent.Interface'
import { useQuery, gql, useSubscription } from '@apollo/client'
import jwt from 'jsonwebtoken'
import { Tooltip } from 'antd'
import { Link } from 'react-router-dom'

const dateFormat = require('dateformat')
const {
  ItemContent,
  ItemContentRecord,
  ItemContentRecordGroup,
  ItemContentRecordReverd,
  ItemContentRecordImage,
} = styles

const jwtToken = localStorage.getItem('jwtToken')
const { id } = JSON.parse(JSON.stringify(jwt.decode(jwtToken)))

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
      userReceive {
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
      userReceive {
        name
        image
        _id
      }
    }
  }
`

interface Iprops {
  id: String
}

const ContentMessageComponent = (props: Iprops) => {
  const [dataCurrent, setDataCurrent] = useState<Array<any>>([])
  const refItemContent = useRef(null)
  const { ...resultQuery } = useQuery(GET_MESSAGE, {
    variables: { id, idUser: props.id },
  })
  const { data } = useSubscription(COMMENTS_SUBSCRIPTION)

  useEffect(() => {
    if (resultQuery.data) {
      const convertTime = resultQuery.data.messages.map((item: any) => {
        return {
          ...item,
          date: dateFormat(new Date(parseInt(item.date)), 'dd/mm/yyyy HH:MM'),
        }
      })
      setDataCurrent(convertTime)
    }
  }, [resultQuery.data])
  useEffect(() => {
    data &&
      (data.newMessage.userReceive._id == props.id ||
        (data.newMessage.userReceive._id == id && data.newMessage.userSend._id == props.id)) &&
      setDataCurrent(pre => [
        ...pre,
        {
          ...data.newMessage,
          date: dateFormat(new Date(parseInt(data.newMessage.date)), 'dd/mm/yyyy HH:MM'),
        },
      ])
  }, [data])
  useEffect(() => {
    refItemContent.current.scrollIntoView({ block: 'end' })
  }, [dataCurrent])

  return (
    <div className={`${ItemContent}`}>
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
  )
}

export default ContentMessageComponent
