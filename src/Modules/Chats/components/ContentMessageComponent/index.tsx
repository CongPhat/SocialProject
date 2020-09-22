import React, { useRef, useState, useEffect } from 'react'
import styles from './style.module.scss'
import { IContentMessageComponent } from './ContentMessageComponent.Interface'
import { useQuery, gql, useSubscription } from '@apollo/client'
import jwt from 'jsonwebtoken'
import { Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import { GET_MESSAGE, COMMENTS_SUBSCRIPTION_CONTENT } from '@Modules/Chats/Chats.graphql'

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

interface Iprops {
  id: String
}

const ContentMessageComponent = (props: Iprops) => {
  const [dataCurrent, setDataCurrent] = useState<Array<any>>([])
  const [payload, setPayload] = useState<number>(0)
  const [loadContentFirst, setLoadContentFirst] = useState<boolean>(false)
  const refBottomContent = useRef(null)
  const refItemContent = useRef(null)
  const refItemContentFirst = useRef(null)
  const { data: dataMessageQuery, loading } = useQuery(GET_MESSAGE, {
    variables: { id, idUser: props.id, payload: payload },
  })
  const { data } = useSubscription(COMMENTS_SUBSCRIPTION_CONTENT, {
    variables: { id, idUser: props.id },
  })

  useEffect(() => {
    if (dataMessageQuery) {
      const convertTime = dataMessageQuery.messages.map((item: any) => {
        return {
          ...item,
          date: dateFormat(new Date(parseInt(item.date)), 'dd/mm/yyyy HH:MM'),
        }
      })
      setDataCurrent(pre => [...convertTime, ...pre])
    }
  }, [dataMessageQuery])
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
  const ScrollContentMessage = () => {
    if (refItemContent.current.scrollTop === 0) {
      setPayload(pre => pre + 1)
    }
  }
  useEffect(() => {
    if (dataCurrent.length > 0) {
      payload !== 0
        ? refItemContentFirst.current &&
          refItemContentFirst.current.scrollIntoView({ block: 'end' })
        : refBottomContent.current.scrollIntoView({ block: 'end' })
    }
    refItemContent.current.removeEventListener('scroll', ScrollContentMessage)
    refItemContent.current.addEventListener('scroll', ScrollContentMessage)
    return () => {
      refItemContent.current.removeEventListener('scroll', ScrollContentMessage)
    }
  }, [dataCurrent, payload])

  return (
    <div className={`${ItemContent}`} ref={refItemContent}>
      {dataCurrent.length > 0 &&
        dataCurrent.map((item: any, index: number) => {
          return (
            <div
              className={`${ItemContentRecord} ${item.isSend == id && ItemContentRecordReverd}`}
              key={index}
              ref={index == dataCurrent.length - payload * 10 ? refItemContentFirst : null}
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
      <div ref={refBottomContent} id="bottomContentMessage" />
    </div>
  )
}

export default React.memo(ContentMessageComponent)
