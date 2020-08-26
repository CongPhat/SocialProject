import React from 'react'
import ViewUserContainer from './container/ViewUserContainer'
import styles from './style.module.scss'

const { user } = styles

interface Props {}

const User: React.FC<Props> = ({}) => {
  return (
    <section className={`${user}`}>
      <ViewUserContainer />
    </section>
  )
}

export default User
