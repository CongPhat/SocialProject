import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchUser} from '@Store/Reducer/User/User.Action';

interface Props {
  deleteUser?: (id: any) => void
}

interface RootState {
  user: any
}

const ListUserComponent: React.FC<Props> = ({deleteUser}) => {
  const user = useSelector((state: RootState) => state.user);
  console.log(user);

  const handleDelete = useCallback((item) => {
    deleteUser(item);
  }, [user.data])

  return (
    <div>
      {user.data.length > 0 && user.data.map((item: any, index: any) => {
        return (
          <div>
            <h5>{item.name}</h5>
            <button onClick={() => handleDelete(item)}>
              Delete
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default ListUserComponent
