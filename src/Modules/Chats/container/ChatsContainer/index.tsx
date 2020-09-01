import React from 'react'
import styles from './style.module.scss'
import { IChatsContainer } from './ChatsContainer.Interface'
import useMemoSelector from '@Common/useMemoSelector'
import ItemsChatComponent from '@Modules/Chats/components/ItemsChatComponent'
const { StyleChatsContainer } = styles
interface Iprops {}

const ChatsContainer = (props: Iprops) => {
  const { listChat } = useMemoSelector('ChatsRuducer', ['listChat'])
  return (
    <div className={`${StyleChatsContainer}`}>
      {listChat.map((itemChat: any, index: number) => (
        <ItemsChatComponent itemChat={itemChat} key={index} />
      ))}
    </div>
  )
}

export default ChatsContainer
