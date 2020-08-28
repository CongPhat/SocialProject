import React, { useCallback } from 'react'
import styles from './style.module.scss'
import { IPostUserComponent } from './PostUserComponent.Interface'
const { StylePostUserComponent, StylePostUserMain, StylePostUserMainOverLay } = styles
interface Iprops {
  postItem: any
  onModalUserPost: (idPost: string) => void
}

const PostUserComponent = (props: Iprops) => {
  const handleShow = useCallback(() => {
    props.onModalUserPost(props.postItem._id)
  }, [props.postItem])
  return (
    <div className={`${StylePostUserComponent}`} onClick={handleShow}>
      <div
        className={`${StylePostUserMain}`}
        style={{ backgroundImage: `url(${props.postItem.image})` }}
      >
        <div className={`${StylePostUserMainOverLay} align-items-center justify-content-center`}>
          <div className="d-flex align-items-center">
            <i className="fa fa-heart" aria-hidden="true"></i>
            <strong>{props.postItem.like}</strong>
          </div>
          <div className="d-flex align-items-center ml-4">
            <i className="fa fa-comment" aria-hidden="true"></i>
            <strong>{props.postItem.like}</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(PostUserComponent)
