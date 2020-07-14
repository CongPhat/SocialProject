import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {fetchUser, deleteUser} from '@Store/Reducer/User/User.Action';
import ListUserComponent from '@Modules/User/component/ItemUser/index';

interface Props {

}

interface RootState {
  user: any
}

const ViewListUserContainer: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [])

  const handleDelete = useCallback((item) => {
    dispatch(deleteUser(item.id));
  }, []);

  return (
    <>
      <ListUserComponent
        deleteUser={handleDelete}
      />
    </>
  )
}

export default ViewListUserContainer
