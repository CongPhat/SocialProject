import React from 'react'
import styles from './style.module.scss'
import { IItemPostUserComponent } from './ItemPostUserComponent.Interface'
import useMemoSelector from '@Common/useMemoSelector'
import SkeletonImageComponent from '@Common/SkeletonImageComponent'
import { Skeleton } from 'antd'
const {
  Item,
  ItemImage,
  ItemContent,
  ItemContentHeader,
  ItemContentMain,
  ItemContentComment,
  ItemsComment,
} = styles

interface Iprops {}

const ItemPostUserComponent = (props: Iprops) => {
  const {
    postUser: { postUser },
  } = useMemoSelector('user', ['postUser'])
  console.log(postUser)

  return (
    <>
      <div className={`${Item} d-flex`}>
        <div className={`${ItemImage}`}>
          {postUser ? <img src={postUser.image} alt="" /> : <SkeletonImageComponent />}
        </div>
        <div className={`${ItemContent}`}>
          <div className={`${ItemContentHeader}`}>
            {postUser ? (
              <>
                <img src={postUser && postUser.user.image} alt={postUser.user.name} />
                <h6>{postUser && postUser.user.name}</h6>
              </>
            ) : (
              <Skeleton avatar paragraph={{ rows: 0 }} title={{ width: '87%' }} />
            )}
          </div>
          <div className={`${ItemContentMain}`}>
            <div className={`${ItemContentComment}`}>
              {postUser && (
                <div className={`${ItemsComment}`}>
                  <img src={postUser && postUser.user.image} alt={postUser.user.name} />
                  <div>
                    <strong>{postUser && postUser.user.name}</strong>
                    <span>{postUser.content}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default React.memo(ItemPostUserComponent)
