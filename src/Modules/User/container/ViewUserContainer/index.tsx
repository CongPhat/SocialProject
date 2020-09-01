import React, { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import {
  getDetailUser,
  deleteUser,
  addFriend,
  addFriendSuccess,
  closeFriend,
  actionModalFriend,
} from '@Store/Reducer/User/User.Action'
import ListUserComponent from '@Modules/User/component/ItemUser/index'
import { useHistory, useParams } from 'react-router-dom'
import ViewUserComponent from '@Modules/User/component/ViewUserComponent'
import { AddUserChat } from '@Store/Reducer/Chats/Chats.Action'

interface Props {}

interface RootState {
  user: any
}

const ViewUserContainer: React.FC<Props> = ({}) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDetailUser(id))
  }, [id])
  const handleAddFriend = (idFriend: string) => {
    dispatch(addFriend(idFriend))
  }
  const handleCloseFriend = (idFriend: string) => {
    dispatch(closeFriend(idFriend))
  }
  const handleModalFriend = () => {
    dispatch(actionModalFriend())
  }
  const handleAddFriendSuccess = (idFriend: string) => {
    dispatch(addFriendSuccess(idFriend))
  }
  const handleShowMessage = useCallback((item: any) => {
    dispatch(AddUserChat(item))
  }, [])

  return (
    <>
      <ViewUserComponent
        addFriend={handleAddFriend}
        closeFriend={handleCloseFriend}
        modalFriend={handleModalFriend}
        addFriendSuccess={handleAddFriendSuccess}
        showMessage={handleShowMessage}
      />
    </>
  )
}

export default React.memo(ViewUserContainer)
