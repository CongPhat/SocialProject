import React from 'react'
import ViewUserContainer from './container/ViewUserContainer'
import styles from './style.module.scss'
import UserContainer from './container/UserContainer'

const { user } = styles

interface Props {}

const User: React.FC<Props> = ({}) => {
  return (
    <section className={`${user}`}>
      <ViewUserContainer />
      <UserContainer />
    </section>
  )
}

export default User
