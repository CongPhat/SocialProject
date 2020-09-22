import React from 'react'
import styles from './style.module.scss'
import { IContentModalFriend } from './ContentModalFriend.Interface'
import ButtonComponent from '@Common/ButtonComponent'
import { useQuery } from '@apollo/client'
import { GET_FRIEND } from '@Modules/User/User.graphql'
import { Link } from 'react-router-dom'
const { listFriend, listFriendHeader, listFriendContent, listFriendItem } = styles
interface Iprops {
  id: string
  closeModal: () => void
}

const ContentModalListFriend = (props: Iprops) => {
  const { data: dataFriendQuery, loading } = useQuery(GET_FRIEND, {
    variables: { id: props.id },
  })
  console.log(loading)

  console.log(dataFriendQuery)

  return (
    <div className={`${listFriend}`}>
      <div className={`${listFriendHeader}`}>
        <h6>Bạn bè</h6>
      </div>
      <div className={`${listFriendContent}`}>
        {dataFriendQuery &&
          dataFriendQuery.friends.map((item: any, index: number) => {
            return (
              <div key={index}>
                <Link
                  to={`/user/${item._id}`}
                  className={listFriendItem}
                  onClick={() => props.closeModal()}
                >
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h6>{item.name}</h6>
                    <span>{item.description}</span>
                  </div>
                </Link>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default React.memo(ContentModalListFriend)
