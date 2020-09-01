import React from 'react'
import styles from './style.module.scss'
import ChatsContainer from './container/ChatsContainer'
const { chats } = styles
const Chats = (props: any) => {
  return (
    <section className={`${chats}`}>
      <ChatsContainer />
    </section>
  )
}
export default React.memo(Chats)
