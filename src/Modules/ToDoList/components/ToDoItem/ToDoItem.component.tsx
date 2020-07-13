import React from 'react';
import styles from './style.module.scss';

interface Props {
  item: {id: number, work: string}
  key: number
}
interface IItem {
  id: number,
  work: string
}

const ToDoItem: React.FC<Props> = ({item}) => {
  const {id, work} = item;
  console.log(styles);

  return (
    <div>
      <p className={styles.item}>{id}: {work}</p>
    </div>
  )
}

export default ToDoItem
