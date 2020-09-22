import { useQuery } from '@apollo/client'
import { GET_FRIEND_ONLINE } from '@Modules/User/User.graphql'
import { AddUserChat } from '@Store/Reducer/Chats/Chats.Action'
import React, { Suspense, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import styles from './style.module.scss'
const { userFriend } = styles
const ListFriendComponent = React.lazy(() => import('@Modules/Home/components/ListFriendComponent'))
interface Iprops {}

const UserFriendContainer = (props: Iprops) => {
  const { data: dataFriendOnline, loading } = useQuery(GET_FRIEND_ONLINE)
  const dispatch = useDispatch()
  console.log(dataFriendOnline)
  const handleShowMessage = useCallback(
    (item: any) => {
      dispatch(AddUserChat(item))
    },
    [dataFriendOnline],
  )
  return (
    <div className={`${userFriend}`}>
      <h6>Liên hệ</h6>
      {dataFriendOnline && (
        <Suspense fallback={<div></div>}>
          <ListFriendComponent dataFriend={dataFriendOnline} showMessage={handleShowMessage} />
        </Suspense>
      )}
    </div>
  )
}

export default UserFriendContainer
