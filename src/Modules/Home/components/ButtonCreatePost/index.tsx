import React from 'react'
import styles from './style.module.scss'
import { ICreatePost } from './CreatePost.Interface'
import useMemoSelector from '@Common/useMemoSelector'
import { Link } from 'react-router-dom'
const { createPost, createPostButton } = styles
interface Iprops {
  showModalCreatePost: () => void
}

const ButtonCreatePost = (props: Iprops) => {
  const { dataUser } = useMemoSelector('LoginReducer', ['dataUser'])
  return (
    <div className={`${createPost} d-flex align-items-center`}>
      <Link to={`/user/${dataUser.id}`}>
        <img src={dataUser.image} />
      </Link>
      <button className={`${createPostButton}`} onClick={() => props.showModalCreatePost()}>
        {dataUser.name} ơi, bạn đang nghĩ gì thế?
      </button>
    </div>
  )
}

export default React.memo(ButtonCreatePost)
