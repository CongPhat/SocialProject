import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {fetchUser} from '@Store/Reducer/User/User.Action';
import ListUserComponent from '@Modules/User/component/ItemUser/index';

interface Props {

}

interface RootState {
  user: any
}

const ViewListUserContainer: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  console.log(123);
  useEffect(() => {
    dispatch(fetchUser());
  }, [])

  return (
    <>
      <ListUserComponent />
    </>
  )
}

export default ViewListUserContainer
