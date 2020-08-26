import React, { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { getDetailUser, deleteUser } from '@Store/Reducer/User/User.Action'
import ListUserComponent from '@Modules/User/component/ItemUser/index'
import { useHistory, useParams } from 'react-router-dom'
import ViewUserComponent from '@Modules/User/component/ViewUserComponent'

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

  return (
    <>
      <ViewUserComponent />
    </>
  )
}

export default React.memo(ViewUserContainer)
