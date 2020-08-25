import React, { useCallback } from 'react'
import styles from './style.module.scss'
import { Link } from 'react-router-dom'

const {
  itemPostElement,
  itemPostElementHeader,
  itemPostElementHeaderContent,
  itemPostElementContent,
  itemPostElementSocial,
  itemPostElementSocialTag,
  itemPostElementSocialLike,
  itemPostElementSocialContent,
  itemPostElementSocialViewAll,
} = styles

interface Iprops {
  itemPost: {
    content: string
    date: any
    image: string
    userId: string
    user: any
  }
}

const ItemsPost = ({ itemPost }: Iprops) => {
  const handleActiveTag = useCallback(() => {}, [])
  return (
    <div className={`${itemPostElement}`}>
      <div className={`${itemPostElementHeader}`}>
        <div className={`${itemPostElementHeaderContent} d-flex align-items-center`}>
          <img src={itemPost.user.image} alt={itemPost.user.name} />
          <Link to={`/user/${itemPost.userId}`}>{itemPost.user.name}</Link>
        </div>
        <div className={`${itemPostElementContent}`}>
          <img src={itemPost.image} />
        </div>
        <div className={`${itemPostElementSocial}`}>
          <div className={`${itemPostElementSocialTag}`}>
            <i className="fa fa-heart-o" aria-hidden="true" onClick={handleActiveTag}></i>
            <i className="fa fa-comment-o" aria-hidden="true" onClick={handleActiveTag}></i>
          </div>
          <div className={`${itemPostElementSocialLike}`}>
            <p>33 likes</p>
          </div>
          <div className={`${itemPostElementSocialContent}`}>
            <span>{itemPost.user.name}</span>
            <span>{itemPost.content}</span>
          </div>
          <p className={`${itemPostElementSocialViewAll}`}>View all 115 comments</p>
          <div className={`${itemPostElementSocialContent}`}>
            <span>{itemPost.user.name}</span>
            <span>{itemPost.content}</span>
          </div>
          <div className={`${itemPostElementSocialContent}`}>
            <span>{itemPost.user.name}</span>
            <span>{itemPost.content}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemsPost
