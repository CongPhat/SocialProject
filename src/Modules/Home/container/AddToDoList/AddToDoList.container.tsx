import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface Props {

}

const AddToDoListContainer: React.FC<Props> = ({history}: RouteComponentProps) => {
  const [workAdd, setWorkAdd] = useState('');
  const dispath = useDispatch();
  const show = () => {
    dispath({type: "ADD_TODO_LIST", value: workAdd});
    history.push('/todolist');
  }

  return (
    <div>
      <input type="text" onChange={(e) => setWorkAdd(e.target.value)}/>
      <button onClick={show}>Add</button>
    </div>
  )
}

export default withRouter(AddToDoListContainer)
