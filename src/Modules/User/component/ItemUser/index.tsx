import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchUser} from '@Store/Reducer/User/User.Action';

interface Props {

}

interface RootState {
  user: any
}

const ListUserComponent: React.FC<Props> = ({}) => {
  const user = useSelector((state: RootState) => state.user.data);

  return (
    <div>
      {user.length > 0 && user.map((item: any, index: any) => {
        return (
          <div>
            <h5>{item.name}</h5>
          </div>
        )
      })}
    </div>
  )
}

export default ListUserComponent
